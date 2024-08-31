const Style = require('../models/Style.module');
const { isString } = require('util');

const CreateStyle = async (req, res) => {
    try {
        let { name, desc } = req.body;
        if (!name || !desc) {
            return res.status(400).json({
                messaga: 'incorrect body structure name or desc is absent',
            });
        } else if (!isString(name) || !isString(desc)) {
            return res.status(400).json({
                messaga:
                    'incorrect body type name and desc have to be a string ',
            });
        }
        const style = await Style.create(req.body);
        res.status(200).json(style);
    } catch (error) {
        res.status(500).json({ massaga: error.massage });
    }
};
const GetAllStyles = async (req, res) => {
    try {
        const tatoos = await Style.find({});
        res.status(200).json(tatoos);
    } catch (error) {
        res.status(500).json({ massaga: error.massage });
    }
};
const UpdateStyle = async (req, res) => {
    try {
        const { id } = req.params;
        let { name, desc } = req.body;
        if (!name || !desc) {
            return res.status(400).json({
                messaga: 'incorrect body structure name or desc is absent',
            });
        } else if (!isString(name) || !isString(desc)) {
            return res.status(400).json({
                messaga:
                    'incorrect body type name and desc have to be a string ',
            });
        }
        const style = await Style.findByIdAndUpdate(id, req.body);
        if (!style) {
            return res.status(404).json({ message: 'Style not found' });
        }
        const updatedstyle = await Style.findById(id);
        res.status(200).json(updatedstyle);
    } catch (error) {
        res.status(500).json({ massaga: error.massage });
    }
};
const DeleteStyle = async (req, res) => {
    try {
        const { id } = req.params;
        await Style.findByIdAndDelete(id).then((response) => {
            res.status(200).json({ message: 'Style is sucsesfully Deleted' });
        });
    } catch (error) {
        res.status(500).json({ massaga: error.massage });
    }
};
module.exports = { CreateStyle, GetAllStyles, UpdateStyle, DeleteStyle };
