const { isString } = require('util');
const Tatoo = require('../models/Tatoo.module');

const GetAllTatoos = async (req, res) => {
    try {
        const tatoos = await Tatoo.find({});
        res.status(200).json(tatoos);
    } catch (error) {
        res.status(500).json({ massaga: error.massage });
    }
};
const PostTatoo = async (req, res) => {
    try {
        const { img_url, style, master } = req.body;
        if (!img_url || !style || !master) {
            return res
                .status(400)
                .json({ message: 'incoorect body structure' });
        } else if (
            !isString(img_url) ||
            !isString(master) ||
            !isString(style)
        ) {
            return res.status(400).json({ message: 'incoorect body types' });
        }
        const tatoo = await Tatoo.create(req.body);
        res.status(200).json(tatoo);
    } catch (error) {
        res.status(500).json({ massaga: error.massage });
    }
};
const UpdateTatoo = async (req, res) => {
    try {
        const { id } = req.params;
        const { img_url, style, master } = req.body;
        if (!img_url || !style || !master) {
            return res
                .status(400)
                .json({ message: 'incoorect body structure' });
        } else if (
            !isString(img_url) ||
            !isString(master) ||
            !isString(style)
        ) {
            return res.status(400).json({ message: 'incoorect body types' });
        }
        const tatoo = await Tatoo.findByIdAndUpdate(id, req.body);
        if (!tatoo) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const updatedTatoo = await Tatoo.findById(id);
        res.status(200).json(updatedTatoo);
    } catch (error) {
        res.status(500).json({ massaga: error.massage });
    }
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
