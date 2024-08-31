const mongoose = require('mongoose');

const StyleSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter Style name'],
        },
        desc: {
            type: String,
            required: [true, 'Please enter Desc '],
        },
    },
    {
        timeStamp: true,
    }
);
const Style = mongoose.model('Style', StyleSchema);
module.exports = Style;
