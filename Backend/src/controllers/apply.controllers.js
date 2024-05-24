import { Apply } from "../models/apply.models";

const applyUserDetails = async (req, res, next) => {
    try {
        // Extract data from request body
        const { firstName, lastName, contactNumber, city, state, country, dateOfBirth } = req.body;

        // Create a new application using the Apply model
        const newApplication = new Apply({
            firstName,
            lastName,
            contactNumber,
            city,
            state,
            country,
            dateOfBirth
        });

        // Save the application to the database
        const savedApplication = await newApplication.save();

        // Send response indicating success
        res.status(201).json({ success: true, data: savedApplication });
    } catch (error) {
        // If an error occurs, pass it to the error handling middleware
        next(error);
    }
};

export { applyUserDetails}