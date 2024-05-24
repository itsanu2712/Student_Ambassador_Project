import { useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { Button, TextInput } from "flowbite-react"
// import nodemailer from 'nodemailer'
import {ToastContainer, toast} from 'react-toastify'
import { baseUrl } from "../constants/baseUrl"

const EventDetailPage = () => {
    const { id } = useParams()
    const [eventDetails, setEventDetails] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.post(`${baseUrl}/api/v1/events/searchEventsByQuery?id=${id}`);
                setEventDetails(response.data.events[0]);
                eventDetails.eventUrl = "https://meet.google.com/"
            } catch (error) {
                console.log(error);
            }
        }
        fetchEventDetails();
    }, [id])

    const handleRsvpNow = () => {
        setIsOpen(true);
    }

    const handlePopUpClose = () => {
        setIsOpen(false);
    }

    const handleSubmitRSVP = async () => {
        // Handle RSVP submission (e.g., send name and email to server)
        console.log("Name:", name);
        console.log("Email:", email);
        // Add your logic here to send name and email to the server

        // send mails 
        await axios.post(`${baseUrl}/api/v1/events/sendMail`, {
            email: email,
            title: "RSVP Confirmation",
            body: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #333333; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Event Registration Confirmation</h1>
            <p style="color: #555555; font-size: 16px;">Hello ${name},</p>
            <p style="color: #555555; font-size: 16px;">You have successfully RSVP'd for the event <strong>${eventDetails.title}</strong>.</p>
            <div style="margin-top: 20px; padding: 10px; background-color: #ffffff; border-radius: 5px; border: 1px solid #dddddd;">
                <p style="color: #333333; font-size: 18px; font-weight: bold; margin-bottom: 10px;">Event Details:</p>
                <p style="color: #555555; font-size: 16px; margin-bottom: 5px;">Title: ${eventDetails.title}</p>
                <p style="color: #555555; font-size: 16px; margin-bottom: 5px;">Organized By: ${eventDetails.organizedBy}</p>
                <p style="color: #555555; font-size: 16px; margin-bottom: 5px;">Date & Time: ${new Date(eventDetails.startTime).toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            })}</p>
                <p style="color: #555555; font-size: 16px; margin-bottom: 5px;">Location: ${eventDetails.city}, ${eventDetails.state}, ${eventDetails.country}</p>
            </div>
            <a href="${eventDetails.eventUrl}" style="text-decoration: none;">
                        <button style="background-color: #eee; padding: 10px 15px; margin-top: 10px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">Join Call</button>
            </a>

            <p style="color: #555555; font-size: 16px; margin-top: 20px;">Thank you for registering for the event. We look forward to seeing you there!</p>
        </div>
    </div>
`
        }).then((res) => {
            console.log(res.data)
            toast("RSVP Submitted Successfully", { type: "success" })
        }).catch((error) => {
            console.log(error)
        })

        setIsOpen(false);
    }


    return (
        <div className="mx-auto mt-10 flex justify-center items-center">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4">
                <img className="object-cover w-full h-64 mb-4" src={eventDetails.thumbnail} alt={eventDetails.title} />
                <h1 className="text-3xl font-bold mb-2">{eventDetails.title}</h1>
                <p className="text-gray-700 text-lg mb-4">{eventDetails.description}</p>
                <div className="flex flex-col md:flex-row justify-around mb-4">
                    <div>
                        <h2 className="font-bold">Organized By</h2>
                        <p>{eventDetails.organizedBy}</p>
                        <h2 className="font-bold mt-4">Speakers</h2>
                        <p>{eventDetails.speakers}</p>
                        <h2 className="font-bold mt-4">Tags</h2>
                        <p>{eventDetails.tags}</p>
                    </div>
                    <div>
                        <h2 className="font-bold mt-4">Mode</h2>
                        <p>{eventDetails.mode}</p>
                        <h2 className="font-bold mt-4">Location</h2>
                        <p>{eventDetails.city}, {eventDetails.state}, {eventDetails.country}</p>
                        <h2 className="font-bold mt-4">Date & Time</h2>
                        <p>{new Date(eventDetails.startTime).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        }).toLocaleString()}</p>
                        <p>{new Date(eventDetails.endTime).toLocaleDateString('en-US', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        }).toLocaleString()}</p>
                    </div>
                </div>
                <div className="text-center w-fit m-auto">
                    <Button gradientDuoTone="purpleToPink" onClick={handleRsvpNow}>RSVP NOW</Button>
                </div>
                {

                    isOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white shadow-md rounded p-7 w-[80%]">
                                <h2 className="text-xl font-bold mb-2">RSVP Now</h2>
                                <TextInput
                                    type="text"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mb-2"
                                />
                                <TextInput
                                    type="email"
                                    placeholder="Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mb-2"
                                />
                                <div className="flex justify-end">
                                    <Button gradientDuoTone="purpleToPink" onClick={handleSubmitRSVP}>Submit</Button>
                                    <Button gradientDuoTone="purpleToPink" className="ml-2" onClick={handlePopUpClose}>Cancel</Button>
                                </div>
                            </div>
                        </div>
                    )


                }

            </div>
            <ToastContainer />
        </div>
    )
}

export default EventDetailPage