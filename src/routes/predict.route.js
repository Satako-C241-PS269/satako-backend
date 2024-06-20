const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth.js');
const { upload, uploadFileToGCS } = require('../middleware/upload.js');

const PredictController = require("../controllers/predict.controller.js");

const predictController = new PredictController();

router.post('/', authenticate, (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        await predictController.getPredictResult(req, res);
    });
});

router.get('/histories', authenticate, predictController.getPredictionHistory);

module.exports = router;