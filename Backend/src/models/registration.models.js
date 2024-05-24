import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
    user_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    event_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    
    date: {
        type: Date
    }
}, { timestamps: true });

export const Registration = mongoose.model("Registration", registrationSchema);