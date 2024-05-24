import mongoose from "mongoose";

const EventCategoriesArray = ["Web Development", "Mobile App Development", "Graphics Design",
    "Robotics", "Artificial Intelligence (AI)", "Cybersecurity", "Data Science and Analytics",
    "Blockchain and Cryptocurrency", "Internet of Things (IoT)", "Game Development",
    "Digital Marketing", "Entrepreneurship and Startup", "Virtual Reality (VR) and Augmented Reality (AR)",
    "Soft Skills Development", "Career Development", "Resume Development", "Website Hosting",
    "GitHub", "Deployment Strategies", "Authentication Methods"];

const eventSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    // ['jfdkfjdkfjd2e829320', 'jfdkfjdkfjd2e829320', 'jfdkfjdkfjd]
    organizedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    speakers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    thumbnail: {
        type: String,
        required: true
    },
    // date: {
    //     type: Date,

    // },
    startTime: {
        type: Date,
        required: true,
        default: Date.now()
    },
    endTime: {
        type: Date,
        required: true,
        default: Date.now()
    },
    tags: [{
        type: String
    }],
    mode: {
        type: String,
        enum: ['online', 'in-person', 'hybrid'],
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
    eventURL: {
        type: String,

    },
    images: [{
        type: String
    }],
    ratings: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    eventsCategory: [{
        type: String,
        enum: EventCategoriesArray,
        required: true
    }]
}, { timestamps: true });

export const Event = mongoose.model("Event", eventSchema);