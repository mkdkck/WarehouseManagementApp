const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const organizationSchema = new Schema({
    orgName: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
    },
    contact: {
        type: String,
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
});

const Organization = model('Organization', organizationSchema);

module.exports = Organization;