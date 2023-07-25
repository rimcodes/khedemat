const mongoose = require('mongoose')

const demandSchema = mongoose.Schema(
    {
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        details: {
            type: String
        },
        date: {
            type: String
        },
        status: {
            type: String
        },
        active: {
            type: Boolean,
            default: true
        },
        location: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

demandSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

demandSchema.set('toJSON', {
    virtuals: true
});

exports.Demand = mongoose.model('Demand', demandSchema)
exports.demandSchema = demandSchema
