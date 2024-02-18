const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const warehouseSchema = new Schema({
    warehouseName: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
    },
    contactDetail: {
        type: String,
        required: true,
    }
});

const Warehouse = model('Warehouse', warehouseSchema);

module.exports = Warehouse;
