const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const pkConfigSchema = new Schema(
    {
        configName: {
            type: String,
            required: true,
            trim: true
        },
        itemPerPk: {
            type: Number,
            required: true,
            default: 1,
            min: 1,
            max: 100
        },
        pkPerlayer: {
            type: Number,
            required: true,
            default: 1,
            min: 1,
            max: 50
        },
        layerPerPallet: {
            type: Number,
            required: true,
            default: 1,
            min: 1,
            max: 10
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

pkConfigSchema.virtual('palletTotalItems').get(function () {
    return this.itemPerPk * this.pkPerlayer * this.layerPerPallet;
});

pkConfigSchema.virtual('palletTotalPks').get(function () {
    return this.pkPerlayer * this.layerPerPallet;
});

const PkConfig = model('PkConfig', pkConfigSchema);

module.exports = PkConfig;
