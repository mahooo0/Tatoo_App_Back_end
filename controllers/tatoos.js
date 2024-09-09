const { isString } = require('util');
const Tatoo = require('../models/Tatoo.module');
const multer = require('multer');
const path = require('path');
function getFileExtension(filename) {
    const match = filename.match(/\.(jpeg|jpg|png|gif)$/i);
    // console.log(match[0]);

    return match[0];
}
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
    const { master, style } = body;
    console.log(req.body);

    if (mimetype && extname) {
        if (!master || !style) {
            cb('Error: incorrect body sturucukture');
        } else if (!isString(master) || !isString(style)) {
            cb('incorrect body type!');
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
const GetAllTatoos = async (req, res) => {
    try {
        const tatoos = await Tatoo.find({});
        res.status(200).json(tatoos);
    } catch (error) {
        res.status(500).json({ massaga: error.massage });
    }
};

// const PostTatoo = async (req, res) => {
//     try {
//         const { img_url, style, master } = req.body;
//         if (!img_url || !style || !master) {
//             return res
//                 .status(400)
//                 .json({ message: 'incoorect body structure' });
//         } else if (
//             !isString(img_url) ||
//             !isString(master) ||
//             !isString(style)
//         ) {
//             return res.status(400).json({ message: 'incoorect body types' });
//         }
//         const tatoo = await Tatoo.create(req.body);
//         res.status(200).json(tatoo);
//     } catch (error) {
//         res.status(500).json({ massaga: error.massage });
//     }
// };
const PostTatoo = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            if (req.file == undefined) {
                res.status(400).json({ message: 'No file selected! ' });
            } else {
                let body = JSON.parse(req.body.json);
                const { master, style } = body;
                const NewTatoo = {
                    master,
                    style,
                    img_url: `/api/image/${req.file.filename}`,
                };
                (async () => {
                    try {
                        const tatoo = await Tatoo.create(NewTatoo);
                        return res.status(200).json(tatoo);
                    } catch (error) {
                        return res.status(500).json({ mesagge: error.mesagge });
                    }
                })();
            }
        }
    });
};
// const UpdateTatoo = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { img_url, style, master } = req.body;
//         if (!img_url || !style || !master) {
//             return res
//                 .status(400)
//                 .json({ message: 'incoorect body structure' });
//         } else if (
//             !isString(img_url) ||
//             !isString(master) ||
//             !isString(style)
//         ) {
//             return res.status(400).json({ message: 'incoorect body types' });
//         }
//         const tatoo = await Tatoo.findByIdAndUpdate(id, req.body);
//         if (!tatoo) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         const updatedTatoo = await Tatoo.findById(id);
//         res.status(200).json(updatedTatoo);
//     } catch (error) {
//         res.status(500).json({ massaga: error.massage });
//     }
// };
const UpdateTatoo = (req, res) => {
    upload(req, res, (err) => {
        const { id } = req.params;
        console.log(id);

        if (err) {
            res.status(500).json({ message: err });
        } else {
            if (req.file == undefined) {
                (async () => {
                    try {
                        let body = JSON.parse(req.body.json);
                        const { style, master } = body;

                        // const oldMaster = await Master.findById(id);
                        // const img_url = oldMaster.img_url;

                        const NewTatoo = {
                            style,
                            master,
                        };
                        console.log(NewTatoo);

                        const tatoo = await Tatoo.updateOne(
                            { _id: id }, // Filter to find the document by ID
                            { $set: NewTatoo }
                        );

                        return res.status(200).json({ message: 'ok' });
                    } catch (error) {
                        return res.status(500).json({ mesagge: error.mesagge });
                    }
                })();
            } else {
                let body = JSON.parse(req.body.json);
                const { style, master } = body;
                console.log(body);

                const NewMAster = {
                    style,
                    master,
                    img_url: `/api/image/${req.file.filename}`,
                };
                (async () => {
                    try {
                        const tatoo = await Tatoo.updateOne(
                            { _id: id }, // Filter to find the document by ID
                            { $set: NewMAster }
                        );
                        return res.status(200).json({ message: tatoo });
                    } catch (error) {
                        return res.status(500).json({ mesagge: error.mesagge });
                    }
                })();
            }
        }
    });
};
const DeleteTatoo = async (req, res) => {
    try {
        const { id } = req.params;
        await Tatoo.findByIdAndDelete(id).then((response) => {
            console.log(response);
            res.status(200).json({ message: 'Tatoo is sucsesfully Deleted' });
        });
    } catch (error) {
        res.status(500).json({ massaga: error.massage });
    }
};
module.exports = { GetAllTatoos, PostTatoo, UpdateTatoo, DeleteTatoo };
