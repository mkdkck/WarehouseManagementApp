const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const customFieldSchema = new Schema(
    {
        fieldName: {
            type: String,
            required: true,
            trim: true
        }
    }
)

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        customFields: [customFieldSchema],

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
