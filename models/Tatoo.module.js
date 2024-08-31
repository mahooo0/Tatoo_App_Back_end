const { timeStamp } = require('console');
const mongoose = require('mongoose');
const { type } = require('os');

const TatooSchema = mongoose.Schema(
    {
        img_url: {
            type: String,
            required: [true, 'Please enter img_url'],
        },
        style: {
            type: String,
            required: [true, 'Please enter Style name'],
        },
        master: {
            type: String,
            required: [true, 'Please enter Master name'],
        },
    },
    {
        timeStamp: true,
    }
);
const Tatoo = mongoose.model('Tatoo', TatooSchema);
module.exports = Tatoo;
