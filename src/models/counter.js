import mongoose from "mongoose";

// Counter Schema
const counterSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    sequence_value: {type: Number, defalut: 0},
});

// Export
const Counter = mongoose.model("Counter", counterSchema);
export default Counter;