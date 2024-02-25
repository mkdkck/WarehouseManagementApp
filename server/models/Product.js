const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const financeSchema = new Schema({
    rrp: {
        type: Number,
    },
    cost: {
        type: Number,
    }
})

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
        min: 1
    },
    layerQty: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    },
    palletQty: {
        type: Number,
        required: true,
        default: 1,
        min: 1
    },
    warehouse: {
        type: Schema.Types.ObjectId,
        ref: 'Warehouse',
        require: true
    },
    zoneCode: {
        type: String
    }
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
}
)

productStackSchema.virtual('subTotalQty').get(function () {
    return this.pkQty * this.pkConfig.itemPerPk + this.layerQty * this.pkConfig.pkPerlayer + this.palletQty * this.pkConfig.layerPerPallet;
});

const customFieldSchema = new Schema(
    {
        name: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
            trim: true
        },

        customFields: [{
            fieldName: {
                type: Schema.Types.ObjectId,
                ref: 'Category',
                required: true,
            },
            fieldValue: {
                type: String,
                required: true,
                trim: true
            },
        }],
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
    productStack: [productStackSchema],
    categoryFiled: [customFieldSchema],
    finance: [financeSchema],
    owner: {
        type: String,
    }
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

productSchema.virtual('totalQty').get(function () {
    let total = 0;
    this.productStack.forEach(stack => {
        total += stack.subTotalQty;
    });
    return total;
});


const Product = model('Product', productSchema);

module.exports = Product;
