const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = new Storage();
const bucketName = 'uploads-satako';

// Set storage engine
// const storage = multer.diskStorage({
//     destination: './uploads',
//     filename: (req, file, cb) => {
//         const date = new Date();
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
//         const day = String(date.getDate()).padStart(2, '0');
//         const hours = String(date.getHours()).padStart(2, '0');
//         const minutes = String(date.getMinutes()).padStart(2, '0');
//         const seconds = String(date.getSeconds()).padStart(2, '0');
//         const filename = `${year}${month}${day}-${hours}${minutes}${seconds}${path.extname(file.originalname).toLowerCase()}`;
//         cb(null, filename);
//     }
// });

// Initialize upload
const multerStorage = multer.memoryStorage();

const upload = multer({
    storage: multerStorage,
    limits: { fileSize: 5000000 }, // Set file size limit to 5MB
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('file');

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

async function uploadFileToGCS(fileBuffer, filename) {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(filename);
    await file.save(fileBuffer);
    return `https://storage.googleapis.com/${bucketName}/${filename}`;
}

module.exports = { upload, uploadFileToGCS };
