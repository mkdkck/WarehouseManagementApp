const mongoose = require('mongoose');
const Product = require('./Product');

const { Schema, model } = mongoose;

const warehouseSchema = new Schema({
    warehouseName: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,

    },
    contactNumber: {
        type: String,
    },
});

const Warehouse = model('Warehouse', warehouseSchema);

warehouseSchema.pre('remove', async function (next) {
    try {
        await Product.deleteMany({ 'productStacks.warehouse': this._id });
        next();
    } catch (error) {
        next(error);
    }
});


module.exports = Warehouse;
