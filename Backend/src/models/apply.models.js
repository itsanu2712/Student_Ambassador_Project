import mongoose from "mongoose";

const applySchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
        },

        contactNumber: {
             type: String,
             required: true
        }, 
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: Date
        }


}, { timestamps: true });


export const Apply = mongoose.model("Apply", applySchema);