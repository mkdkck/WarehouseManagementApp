const mongoose = require('mongoose');
const Product = require('./Product');

const { Schema, model } = mongoose;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        products: [{
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

categorySchema.virtual('productCount').get(function () {
    return this.products.length;
});

const Category = model('Category', categorySchema);

module.exports = Category;
