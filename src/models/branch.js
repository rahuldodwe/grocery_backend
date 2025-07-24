import mongoose, { mongo } from "mongoose";

// Branch Schema
const branchSchema = new mongoose.Schema({
    name: { type: String, required: true} ,
    location: {
        latitude: {type: Number},
        longitude: {type: Number},
    },
    address: {type: String},
    deliveryPartners: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DeliveryPartner",
        },
    ]
});

// Export 
const Branch = mongoose.model("Bramch", branchSchema);
export default Branch;