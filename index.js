const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const MAstersRouter = require('./routes/Masters.route.js');
const TatooRouter = require('./routes/Tatoos.route.js');
const StyleRouter = require('./routes/Styles.route.js');
const cors = require('cors');
const port = process.env.PORT || 4000;
const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// Routers
app.use('/api/tatoos', TatooRouter);
app.use('/api/styles', StyleRouter);
app.use('/api/masters', MAstersRouter);
function getFileExtension(filename) {
    const match = filename.match(/\.(jpeg|jpg|png|gif)$/i);
    // console.log(match[0]);

    return match[0];
}
// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, ` ${Date.now()}${getFileExtension(file.originalname)}`);
    },
});

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
}).single('image'); // 'image' is the name of the form field

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// POST route for uploading an image

// app.post('/api/upload', (req, res) => {
//     upload(req, res, (err) => {
//         if (err) {
//             res.status(500).json({ message: err });
//         } else {
//             if (req.file == undefined) {
//                 res.status(400).json({ message: 'No file selected!' });
//             } else {
//                 // let body = JSON.parse(req.body.json);
//                 // console.log(body.name);

//                 res.status(200).json({
//                     message: 'body',
//                     filename: req.file.filename,
//                 });
//             }
//         }
//     });
// });
//http://localhost:4000/api/image/imgname.png

// GET route for retrieving an image by filename
app.get('/api/image/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'uploads', filename);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ message: 'Image not found!' });
    }
});

// Connect to MongoDB and start server
mongoose
    .connect(
        'mongodb+srv://admin:Mehemmed.1@backenddb.fcdil.mongodb.net/Tatoos?retryWrites=true&w=majority&appName=BackendDB'
    )
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}`)
        );
    })
    .catch((err) => {
        console.error('Connection failed', err);
    });
