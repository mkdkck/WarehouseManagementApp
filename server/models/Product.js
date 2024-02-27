const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const productStackSchema = new Schema({
    pkConfig: {
        type: Schema.Types.ObjectId,
        ref: 'PkConfig',
        require: true
    },
    pkQty: {
        type: Number,
        required: true,
        default: 1,
    },
    layerQty: {
        type: Number,
        required: true,
        default: 1,
    },
    palletQty: {
        type: Number,
        required: true,
        default: 1,
    },
    warehouse: {
        type: Schema.Types.ObjectId,
        ref: 'Warehouse',
        require: true
    },
    zoneCode: {
        type: String
    }
}
)

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    productStacks: [productStackSchema],
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Category',
        }
    ],
    owner: {
        type: String,
    }
})

const Product = model('Product', productSchema);

module.exports = Product;
