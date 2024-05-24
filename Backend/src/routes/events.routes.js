import Router from "express";
import {addNewEvent, addEventImages, searchEvents, generateRandomEventsData, getAllEventsByOrganizer} from "../controllers/events.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { mailSender } from "../utils/sendMail.js";

const router = Router();

// Route to add a new event
router.route("/addNewEvent").post(verifyJWT, upload.single("thumbnail"), addNewEvent)

// Route to add images to an event
router.route("/addeventImages").post(verifyJWT, addEventImages)

// Route to search events by query
router.route('/searchEventsByQuery').post(searchEvents)

router.route('/generateData').get(generateRandomEventsData);

router.route("/getAllEventsByOrganizer").get(verifyJWT, getAllEventsByOrganizer)

router.route('/sendMail').post((req, res) => {
    const {email, title, body} = req.body;
    console.log(email, title, body);
    const info = mailSender(email, title, body);
    console.log("Message sent: %s", info.messageId);
    res.send("Mail sent successfully")
});

export default router;