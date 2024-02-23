const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const warehouseSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,

    },
    contactNumber: {
        type: String,
    }
});

const Warehouse = model('Warehouse', warehouseSchema);

module.exports = Warehouse;
