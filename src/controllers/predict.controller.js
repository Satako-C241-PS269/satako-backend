const tf = require('@tensorflow/tfjs-node');
const Prediction = require('../models/predict.model');
const getDiseaseInfo = require('../utils/diseaseInfo');
const { uploadFileToGCS } = require('../middleware/upload');
const path = require('path');


class PredictController {
    constructor() {
        this.getPredictResult = this.getPredictResult.bind(this);
        this.getPredictionHistory = this.getPredictionHistory.bind(this);
    }

    async getPredictResult(req, res) {
        try {
            console.log('Request received:', req.file);
            console.log('Authenticated user:', req.user); // Log the authenticated user

            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            const filename = `${year}${month}${day}-${hours}${minutes}${seconds}${path.extname(req.file.originalname).toLowerCase()}`;

            // Upload file to Google Cloud Storage
            const imageUrl = await uploadFileToGCS(req.file.buffer, filename);

            console.log('Starting to process the image...');
            const modelPath = 'https://storage.googleapis.com/satako-storage/model_tfjs/model.json';
            const model = await tf.loadLayersModel(modelPath);
            console.log('Model loaded successfully.');

            // Decode the image buffer to a tensor
            const tensor = tf.node
                .decodeImage(req.file.buffer, 3) // 3 channels (RGB)
                .resizeBilinear([240, 240]) // Resize to [240, 240]
                .expandDims()
                .toFloat();

            console.log('Image decoded and tensor created:', tensor.shape);

            // Predict using the model
            const prediction = model.predict(tensor);
            const scores = await prediction.data();
            const confidenceScore = Math.max(...scores);
            const label = tf.argMax(prediction, 1).dataSync()[0];

            console.log('Prediction made successfully with score:', scores);

            const diseaseInfo = getDiseaseInfo(label);

            // Save prediction to history
            const predictionHistory = new Prediction({
                userId: req.user.id,
                imageUrl: imageUrl, // Save URL instead of local path
                disease: diseaseInfo.name,
                confidenceScore,
                description: diseaseInfo.description,
                causes: diseaseInfo.causes,
                solutions: diseaseInfo.solutions.join('\n')
            });
            await predictionHistory.save();

            return res.status(200).json({
                status: 'success',
                message: 'Predict success',
                data: {
                    disease: diseaseInfo.name,
                    confidenceScore,
                    description: diseaseInfo.description,
                    causes: diseaseInfo.causes,
                    solutions: diseaseInfo.solutions.join('\n'),
                    imageUrl: imageUrl // Return URL instead of local path
                }
            });
        } catch (error) {
            console.error('Error in controller:', error);
            return res.status(500).json({
                status: 'error',
                message: 'An internal server error occurred'
            });
        }
    }

    async getPredictionHistory(req, res) {
        try {
            const userId = req.user.id;
            const history = await Prediction.find({ userId }).sort({ createdAt: -1 });

            return res.status(200).json({
                status: 'success',
                data: history
            });
        } catch (error) {
            console.error('Error fetching history:', error);
            return res.status(500).json({
                status: 'error',
                message: 'An internal server error occurred'
            });
        }
    }
}

module.exports = PredictController;