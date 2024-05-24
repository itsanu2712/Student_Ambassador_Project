import { Event } from '../models/events.models.js';
import { uploadFileOnCloudinary } from '../utils/cloudinary.js';
import {faker} from '@faker-js/faker'

export const addNewEvent = async (req, res) => {

    // if there is no user in the request then do not allow the user to add event
    if (!req.user) {
        return res.status(401).json({ message: "You are not  a authorized" });
    }
    // required fields


    if (!req.body.title || !req.body.startTime || !req.body.endTime
        || !req.body.mode || !req.body.city || !req.body.state || !req.body.country || !req.body.eventsCategory) {
        return res.status(400).json({ message: 'Please provide all required field' });
    }

    var response = ""
    if (req.file) {
        const filePath = req.file.originalname
        response = await uploadFileOnCloudinary(`\public\\temp\\${filePath}`)
        console.log(response)

        if (!response.url) {
            return res.status(500).json({ message: "Please upload the image " })
        }
        response = response.url
    }

    const newEvent = new Event({
        ...req.body,
        thumbnail: response,
        organizedBy: req.user.id,

    });
    try {
        const saveEvent = await newEvent.save();
        res.status(201).json({ data: saveEvent, success: true });
    }
    catch (error) {
        console.log(`Add event error ${error}`)
        res.status(500).json({ message: 'Internal Server Error' });
    }

}

// add image to an event

export const addEventImages = async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ message: "You are not authorized to upload images." });
        }

        // Check if file exists in the request
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        // Upload image to Cloudinary
        const response = await uploadFileOnCloudinary(`\public\\temp\\${filePath}`);

        // Check if image upload was successful
        if (!response || !response.url) {
            return res.status(500).json({ message: "Failed to upload image." });
        }

        // Create new image object
        const newImage = new Image({
            images: response.url,
            userId: req.user.id // Assuming userId is the correct field name
        });

        // Save image to database
        const savedImage = await newImage.save();

        // Return success response
        res.status(201).json(savedImage);
    } catch (error) {
        console.error("Error adding image:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


//search event by query

export const searchEvents = async (req, res) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        console.log(startIndex)
        const limit = parseInt(req.query.limit) || 9;
        console.log(limit)
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        console.log(sortDirection)
        console.log(req.query);
        const events = await Event.find({
            ...(req.query.id && { _id: req.query.id }),
            ...(req.query.userId && { organizedBy: req.query.userID }),
     
            ...(req.query.startTime && { startTime: req.query.startTime }),
            ...(req.query.endTime && { endTime: req.query.endTime }),
            ...(req.query.city && { city: req.query.city }),
            ...(req.query.state && { state: req.query.state }),
            ...(req.query.country && { country: req.query.country }),
            ...(req.query.mode && { mode: req.query.mode }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { description: { $regex: req.query.searchTerm, $options: 'i' } },
                    { eventsCategory: { $regex: req.query.searchTerm, $options: 'i' } },
                ]
            })
        }).sort({ updateAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        console.log(events);
        const totalEvents = await Event.countDocuments();
        console.log(totalEvents)
        

        res.status(200).json({
            events,
            totalEvents,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });

    }
}



// generate random events data
export const generateRandomEventsData = async (req, res) => {

    try {
        const citiesArray = [
            "Agra",
            "Aligarh",
            "Allahabad",
            "Ambedkar Nagar",
            "Amroha (Jyotiba Phule Nagar)",
            "Auraiya",
            "Azamgarh",
            "Baghpat",
            "Bahraich",
            "Ballia",
            "Balrampur",
            "Banda",
            "Bara Banki",
            "Bareilly",
            "Basti",
            "Bijnor",
            "Budaun",
            "Bulandshahr",
            "Chandauli",
            "Chitrakoot",
            "Deoria",
            "Etah",
            "Etawah",
            "Faizabad",
            "Farrukhabad",
            "Fatehpur",
            "Firozabad",
            "Gautam Buddha Nagar",
            "Ghaziabad",
            "Ghazipur",
            "Gonda",
            "Gorakhpur",
            "Hamirpur",
            "Hardoi",
            "Hathras (Mahamaya Nagar)",
            "Jalaun",
            "Jaunpur",
            "Jhansi",
            "Kannauj",
            "Kanpur Dehat",
            "Kanpur Nagar",
            "Kasganj (Kanshiram Nagar)",
            "Kaushambi",
            "Kheri (Lakhimpur Kheri)",
            "Kushinagar",
            "Lalitpur",
            "Lucknow",
            "Mahoba",
            "Mahrajganj (Maharajganj)",
            "Mainpuri",
            "Mathura",
            "Mau",
            "Meerut",
            "Mirzapur",
            "Moradabad",
            "Muzaffarnagar",
            "Pilibhit",
            "Pratapgarh",
            "Rae Bareli",
            "Rampur",
            "Saharanpur",
            "Sant Kabir Nagar",
            "Sant Ravidas Nagar (Bhadohi)",
            "Shahjahanpur",
            "Shrawasti (Shravasti)",
            "Siddharthnagar",
            "Sitapur",
            "Sonbhadra",
            "Sultanpur",
            "Unnao",
            "Varanasi"
        ];
        const events = [];
        for (let i = 0; i < 20; i++) {
            const newEvent = new Event({
                title: faker.lorem.words(),
                description: faker.lorem.sentence(),
                thumbnail: faker.image.dataUri(),
                startTime: faker.date.recent(),
                endTime: faker.date.future(),
                tags: faker.helpers.arrayElement(['ReactJs', 
                'Express', 
                'Node.Js', 
                'MongoDB', 
                'C', 
                'C++', 
                'Java', 
                '#c', 
                'HTML', 
                'CSS', 
                'JavaScript', 
                'React Native',
                'Angular',
                'Vue.js',
                'TypeScript',
                'Python',
                'Django',
                'Flask',
                'Ruby on Rails',
                'PHP',
                'Laravel',
                'Swift',
                'Kotlin',
                'Android',
                'iOS',
                'Unity',
                'Unreal Engine',
                'Docker',
                'Kubernetes',
                'AWS (Amazon Web Services)',
                'Azure',
                'Google Cloud Platform (GCP)',
                'GraphQL',
                'RESTful APIs',
                'MySQL',
                'PostgreSQL',
                'SQLite',
                'Redis',
                'Elasticsearch',
                'Apache Kafka',
                'TensorFlow',
                'PyTorch',
                'Scikit-learn',
                'Spark',
                'Hadoop',
                'Apache Cassandra',
                'RabbitMQ',
                'Apache Kafka',
                'Nginx',
                'Apache HTTP Server',
                'Jenkins',
                'Git',
                'SVN (Subversion)',
                'Mercurial',
                'JIRA',
                'Confluence',
                'Slack',
                'Microsoft Teams',
                'Zoom',
                'WebSockets',
                'OAuth',
                'JWT (JSON Web Tokens)',
                'Firebase',
                'Electron',
                'Progressive Web Apps (PWAs)',
                'Serverless Framework',
                'Microservices Architecture',
                'DevOps',
                'Agile Methodology',
                'Scrum',
                'Kanban'
            ]),
                organizedBy: '66267e8b5da0e947981967ab',
                mode: faker.helpers.arrayElement(['online', 'in-person', 'hybrid']),
                city: faker.helpers.arrayElement(citiesArray),
                state: 'Uttar Pradesh',
                country: 'India',
                eventsCategory: faker.helpers.arrayElement(["Web Development", "Mobile App Development", "Graphics Design",
                "Robotics", "Artificial Intelligence (AI)", "Cybersecurity", "Data Science and Analytics",
                "Blockchain and Cryptocurrency", "Internet of Things (IoT)", "Game Development",
                "Digital Marketing", "Entrepreneurship and Startup", "Virtual Reality (VR) and Augmented Reality (AR)",
                "Soft Skills Development", "Career Development", "Resume Development", "Website Hosting",
                "GitHub", "Deployment Strategies", "Authentication Methods"]),
            });
            events.push(newEvent);
        }

        await Event.insertMany(events);
        res.status(201).json({ message: "Events data generated successfully" });
    } catch (error) {
        console.error("Error generating events data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


// get all events by organizer
export const getAllEventsByOrganizer = async (req,res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "You are not authorized to view this page." });
        }
        // req.user is set by verifyJWT, which is a middleware that verifies the JWT token
        // we are not taking anything in the body, just taking the logged in user id from the backend.
        const events = await Event.find({ organizedBy: { $in: [req.user.id] } });
        res.status(200).json({events: events, success: true});
    } catch (error) {
        console.error("Error getting events by organizer:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}














// Add a new event
// make changes according the reuired field and check fields

// const addEvent = async (req, res) => {
//         try {
//             const newEvent = await Event.create(req.body);
//             return res.status(201).json({ success: true, data: newEvent });
//         } catch (error) {
//             return res.status(500).json({ success: false, error: error.message });
//         }
//     }

//     // Add images to an event
//    const addEventImages = async (req, res) => {
//         try {
//             const eventId = req.params.eventId;
//             const images = req.body.images; // Assuming images are sent in the request body

//             const event = await Event.findById(eventId);
//             if (!event) {
//                 return res.status(404).json({ success: false, error: 'Event not found' });
//             }

//             event.images.push(...images);
//             await event.save();

//             return res.status(200).json({ success: true, data: event });
//         } catch (error) {
//             return res.status(500).json({ success: false, error: error.message });
//         }
//     }

//     // Search events by query
//    const searchEvents = async (req, res) => {
//         try {
//             const query = req.query.q;
//             const events = await Event.find({ $text: { $search: query } }); // Assuming text index is created on fields you want to search

//             return res.status(200).json({ success: true, data: events });
//         } catch (error) {
//             return res.status(500).json({ success: false, error: error.message });
//         }
//     }

// export {addEvent, addEventImages, searchEvents}