const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema(
    {
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Category'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            default: 0
        },
        details: {
            type: String
        },
        description: {
            type: String
        },
        isFeatured: {
            type: Boolean,
            default: false
        },
        active: {
            type: Boolean,
            default: true
        },
        image: {
            type: String
        },
        images: {
            type: [String]
        }
    },
    {
        timestamps: true
    }
)

serviceSchema.virtual('id').get(function () {
    return this._id.toHexString();
});


serviceSchema.set('toJSON', {
    virtuals: true
});

exports.Service = mongoose.model('Service', serviceSchema)
exports.serviceSchema = serviceSchema