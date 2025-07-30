import mongoose from "mongoose";
import Counter from "./counter.js";

// Order Schema
const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unique: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
        required: true,
    },
    deliveryPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
    },
    items: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            count: {type: Number, required: true},
        },
    ],
    deliveryLocation: {
        latitude: {type: Number},
        longitude: {type: Number},
        address: {type: String},
    },
    pickupLocation: {
        latitude: {type: Number},
        longitude: {type: Number},
        address: {type: String},
    },
    deliveryPersonLocation: {
        latitude: {type: Number},
        longitude: {type: Number},
        address: {type: String},
    },
    status: {
        type: String,
        enum: ["available", "confirmed", "arriving", "delivered", "cancelled"],
        default: "available",
    },
    totalPrice: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

// function for sequence value
async function getNextSequenceValue(sequenceName){
    const sequenceDocument = await Counter.findOneAndUpdate(
        {name: sequenceName},
        {$inc: {sequence_value: 1}},
        {new: true, upsert: true},
    );
    return sequenceDocument.sequence_value;
};

// function before load schema
orderSchema.pre('save', async function(next){
    if(this.isNew){
        const sequenceValue = await getNextSequenceValue("orderId");
        this.orderId=`ORDR${sequenceValue.toString().padStart(5,'0')}`
    };
    next();
})


// Export
const Order = mongoose.model("Order", orderSchema);
export default Order;