const mongoose = require('mongoose');

const MAstersSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter Style name'],
        },
        img_url: {
            type: String,
            required: [true, 'Please enter img_url'],
        },
        styles: {
            type: Array,
            required: [true, 'Please enter Styles'],
        },
        desc: {
            type: String,
            required: [true, 'Please enter Style name'],
        },
    },
    {
        timeStamp: true,
    }
);
const Master = mongoose.model('Masters', MAstersSchema);
module.exports = Master;
