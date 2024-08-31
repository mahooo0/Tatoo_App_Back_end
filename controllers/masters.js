const Master = require('../models/Masters.module');
const { isString, isArray } = require('util');

const CreateMaster = async (req, res) => {
    try {
        // console.log(req.body);
        const { name, img_url, styles, desc } = req.body;
        if (!name || !img_url || !styles || !desc) {
            return res
                .status(400)
                .json({ mesagge: 'incorrect body sturucukture' });
        } else if (
            !isString(name) ||
            !isString(desc) ||
            !isString(img_url) ||
            !isArray(styles)
        ) {
            return res.status(400).json({ mesagge: 'incorrect body type' });
        } else if (styles.length === 0) {
            return res.status(400).json({ mesagge: 'Style is empty' });
        }
        const master = await Master.create(req.body);
        res.status(200).json(master);
    } catch (error) {
        res.status(500).json({ mesagge: error.mesagge });
    }
};
const GetAllMasters = async (req, res) => {
    try {
        const masters = await Master.find({});
        res.status(200).json(masters);
    } catch (error) {
        res.status(500).json({ massaga: error.massage });
    }
};
const UpdateMaster = async (req, res) => {
    try {
        const { id } = req.params;

        const { name, img_url, styles, desc } = req.body;
        if (!name || !img_url || !styles || !desc) {
            return res
                .status(400)
                .json({ mesagge: 'incorrect body sturucukture' });
        } else if (
            !isString(name) ||
            !isString(desc) ||
            !isString(img_url) ||
            !isArray(styles)
        ) {
            return res.status(400).json({ mesagge: 'incorrect body type' });
        } else if (styles.length === 0) {
            return res.status(400).json({ mesagge: 'Style is empty' });
        }
        const masters = await Master.findByIdAndUpdate(id, req.body);
        if (!masters) {
            return res.status(404).json({ message: 'MAster not found' });
        }
        const updatedMaster = await Master.findById(id);
        res.status(200).json(updatedMaster);
    } catch (error) {
        res.status(500).json({ massaga: error.massage });
    }
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
module.exports = { CreateMaster, GetAllMasters, UpdateMaster, DEleteMasters };
