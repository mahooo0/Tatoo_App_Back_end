const Master = require('../models/Masters.module');
const { isString, isArray } = require('util');
// const upload = require('./ImageUpload');
const multer = require('multer');
const path = require('path');

function getFileExtension(filename) {
    const match = filename.match(/\.(jpeg|jpg|png|gif)$/i);
    // console.log(match[0]);

    return match[0];
}
// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${getFileExtension(file.originalname)}`);
    },
});
function checkFileType(file, cb, req) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    let body = JSON.parse(req.body.json);
    const { name, styles, desc } = body;
    console.log(body);

    if (mimetype && extname) {
        if (!name || !styles || !desc) {
            cb('Error: incorrect body sturucukture');
        } else if (!isString(name) || !isString(desc) || !isArray(styles)) {
            cb('incorrect body type!');
        } else if (styles.length === 0) {
            cb('Error: Style is empty');
        }
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB limit
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb, req);
    },
}).single('image');

const CreateMaster = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            if (req.file == undefined) {
                res.status(400).json({ message: 'No file selected! ' });
            } else {
                let body = JSON.parse(req.body.json);
                const { name, styles, desc } = body;
                const NewMAster = {
                    name,
                    styles,
                    desc,
                    img_url: `/api/image/${req.file.filename}`,
                };
                (async () => {
                    try {
                        const master = await Master.create(NewMAster);
                        return res.status(200).json(master);
                    } catch (error) {
                        return res.status(500).json({ mesagge: error.mesagge });
                    }
                })();
            }
        }
    });
};
// const CreateMaster = async (req, res) => {
//     res.end(req);
//     try {
//         // console.log(body);
//         const { name, img_url, styles, desc } = req.body;
//         if (!name || !img_url || !styles || !desc) {
//             return res
//                 .status(400)
//                 .json({ mesagge: 'incorrect body sturucukture' });
//         } else if (
//             !isString(name) ||
//             !isString(desc) ||
//             !isString(img_url) ||
//             !isArray(styles)
//         ) {
//             return res.status(400).json({ mesagge: 'incorrect body type' });
//         } else if (styles.length === 0) {
//             return res.status(400).json({ mesagge: 'Style is empty' });
//         }
//         const master = await Master.create(req.body);
//         res.status(200).json(master);
//     } catch (error) {
//         res.status(500).json({ mesagge: error.mesagge });
//     }
// };
const GetAllMasters = async (req, res) => {
    try {
        const masters = await Master.find({});
        res.status(200).json(masters);
    } catch (error) {
        res.status(500).json({ massaga: error.massage });
    }
};
// const UpdateMaster = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const { name, img_url, styles, desc } = req.body;
//         if (!name || !img_url || !styles || !desc) {
//             return res
//                 .status(400)
//                 .json({ mesagge: 'incorrect body sturucukture' });
//         } else if (
//             !isString(name) ||
//             !isString(desc) ||
//             !isString(img_url) ||
//             !isArray(styles)
//         ) {
//             return res.status(400).json({ mesagge: 'incorrect body type' });
//         } else if (styles.length === 0) {
//             return res.status(400).json({ mesagge: 'Style is empty' });
//         }
//         const masters = await Master.findByIdAndUpdate(id, req.body);
//         if (!masters) {
//             return res.status(404).json({ message: 'MAster not found' });
//         }
//         const updatedMaster = await Master.findById(id);
//         res.status(200).json(updatedMaster);
//     } catch (error) {
//         res.status(500).json({ massaga: error.massage });
//     }
// };
const UpdateMaster = (req, res) => {
    upload(req, res, (err) => {
        const { id } = req.params;
        if (err) {
            res.status(500).json({ message: err });
        } else {
            if (req.file == undefined) {
                (async () => {
                    try {
                        let body = JSON.parse(req.body.json);
                        const { name, styles, desc } = body;

                        // const oldMaster = await Master.findById(id);
                        // const img_url = oldMaster.img_url;

                        const NewwMAster = {
                            name,
                            styles,
                            desc,
                        };
                        console.log(NewwMAster);

                        const master = await Master.updateOne(
                            { _id: id }, // Filter to find the document by ID
                            { $set: NewwMAster }
                        );

                        return res.status(200).json({ message: 'OK' });
                    } catch (error) {
                        return res.status(500).json({ mesagge: error.mesagge });
                    }
                })();
            } else {
                let body = JSON.parse(req.body.json);
                const { name, styles, desc } = body;
                console.log(body);

                const NewMAster = {
                    name,
                    styles,
                    desc,
                    img_url: `/api/image/${req.file.filename}`,
                };
                (async () => {
                    try {
                        const master = await Master.updateOne(
                            { _id: id }, // Filter to find the document by ID
                            { $set: NewMAster }
                        );
                        return res.status(200).json({ message: 'OK' });
                    } catch (error) {
                        return res.status(500).json({ mesagge: error.mesagge });
                    }
                })();
            }
        }
    });
};
const DEleteMasters = async (req, res) => {
    try {
        const { id } = req.params;
        await Master.findByIdAndDelete(id).then((response) => {
            res.status(200).json({ message: 'Master is sucsesfully Deleted' });
        });
    } catch (error) {
        res.status(500).json({ massaga: error.massage });
    }
};
module.exports = {
    CreateMaster,
    GetAllMasters,
    UpdateMaster,
    DEleteMasters,
};
