import { Label, FileInput, TextInput, Button } from "flowbite-react";
import { useState } from "react";

import axios from "axios"
import Select from 'react-select'
import {ToastContainer, toast} from 'react-toastify'
import { baseUrl } from "../constants/baseUrl";



const AddEvents = () => {



    const [error, setError] = useState("");
    const [thumbnail, setThumbnail] = useState();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    //const [organizedBY, setOrganizedBY] = useState("");
    const [eventCategory, setEventCategory] = useState(""); // use multiple select
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("")
    //  const [date, setDate] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [mode, setModes] = useState("");
    const [eventURL, setEventURL] = useState("");



    const eventOptions = [
        { value: 'Web Development', label: 'Web Development' },
        { value: 'Mobile App Development', label: 'Mobile App Development' },
        { value: 'Graphics Design', label: 'Graphics Design' },
        { value: 'Robotics', label: 'Robotics' },
        { value: 'Artificial Intelligence (AI)', label: 'Artificial Intelligence (AI)' },
        { value: 'Cybersecurity', label: 'Cybersecurity' },
        { value: 'Data Science and Analytics', label: 'Data Science and Analytics' },
        { value: 'Blockchain and Cryptocurrency', label: 'Blockchain and Cryptocurrency' },
        { value: 'Internet of Things (IoT)', label: 'Internet of Things (IoT)' },
        { value: 'Game Development', label: 'Game Development' },
        { value: 'Digital Marketing', label: 'Digital Marketing' },
        { value: 'Entrepreneurship and Startup', label: 'Entrepreneurship and Startup' },
        { value: 'Virtual Reality (VR) and Augmented Reality (AR)', label: 'Virtual Reality (VR) and Augmented Reality (AR)' },
        { value: 'Soft Skills Development', label: 'Soft Skills Development' },
        { value: 'Career Development', label: 'Career Development' },
        { value: 'Resume Development', label: 'Resume Development' },
        { value: 'Website Hosting', label: 'Website Hosting' },
        { value: 'GitHub', label: 'GitHub' },
        { value: 'Deployment Strategies', label: 'Deployment Strategies' },
        { value: 'Authentication Methods', label: 'Authentication Methods' },


    ];

    const statesOption = [
        { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
        { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
        { value: 'Assam', label: 'Assam' },
        { value: 'Bihar', label: 'Bihar' },
        { value: 'Chhattisgarh', label: 'Chhattisgarh' },
        { value: 'Goa', label: 'Goa' },
        { value: 'Gujarat', label: 'Gujarat' },
        { value: 'Haryana', label: 'Haryana' },
        { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
        { value: 'Jharkhand', label: 'Jharkhand' },
        { value: 'Karnataka', label: 'Karnataka' },
        { value: 'Kerala', label: 'Kerala' },
        { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
        { value: 'Maharashtra', label: 'Maharashtra' },
        { value: 'Manipur', label: 'Manipur' },
        { value: 'Meghalaya', label: 'Meghalaya' },
        { value: 'Mizoram', label: 'Mizoram' },
        { value: 'Nagaland', label: 'Nagaland' },
        { value: 'Odisha', label: 'Odisha' },
        { value: 'Punjab', label: 'Punjab' },
        { value: 'Rajasthan', label: 'Rajasthan' },
        { value: 'Sikkim', label: 'Sikkim' },
        { value: 'Tamil Nadu', label: 'Tamil Nadu' },
        { value: 'Telangana', label: 'Telangana' },
        { value: 'Tripura', label: 'Tripura' },
        { value: 'Uttarakhand', label: 'Uttarakhand' },
        { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
        { value: 'West Bengal', label: 'West Bengal' },
    ]

    const modeOptions = [
        { value: 'online', label: 'Online' },
        { value: 'hybrid', label: 'Hybrid' },
        { value: 'in-person', label: 'In-Person' },
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();

        const eventCategory2 = eventCategory.map((category) => category.value);
        console.log('====================================');
        console.log(title);
        console.log(description);
        console.log(startTime);
        console.log(endTime);
        console.log(city);
        console.log(state);
        console.log(mode);
        console.log(eventURL);
        //console.log(date);
        console.log(eventCategory2);
        console.log(thumbnail);
        //console.log(organizedBY);
        //  console.log(thumbnail);
        console.log('====================================');



        setError('Loading.........')
        const formData = new FormData();
        formData.append('thumbnail', thumbnail);
        formData.append('title', title);
        formData.append('description', description);
        // formData.append('organizedBy', organizedBy);
        formData.append('eventsCategory', eventCategory2);

        formData.append('startTime', startTime);
        formData.append('endTime', endTime);
        formData.append('country', 'India');
        formData.append('mode', mode.value);
        formData.append('state', state.value);
        formData.append('city', city);
        formData.append('eventURL', eventURL);


        //formData.append('companyname', companyName);


        console.log(formData.get('eventsCategory'));
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        await axios.post(`${baseUrl}/api/v1/events/addNewEvent`, formData, {
            ...config,
            withCredentials: true  // Add this line to include credentials in the request
        }).then((response) => {
            console.log(response);
            setError('Event Added Successfully')
            toast("Event Added Successfully", { type: "success" })

        }).catch((error) => {
            console.log(error);
        })
    }



    return (
        <>
            <div className="flex flex-col items-center justify-center w-[40rem]">

                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form className="w-[100%] flex flex-col items-center py-12" onSubmit={handleSubmit}>
                    {/* upload file - thumbnail*/}
                    <div className="mb-4 w-3/5">
                        <div>
                            <Label htmlFor="thumbnail" value="Upload Event Thumbnail" />
                        </div>
                        <FileInput id="thumbnail" sizing="lg" onChange={(e) => setThumbnail(e.target.files[0])} />
                    </div>

                    {/* title */}
                    <div className="w-3/5 mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Title " />
                        </div>
                        <TextInput id="title " type="text" placeholder=" Title of Event" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>


                    {/* Description*/}
                    <div className="w-3/5 mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="description " value="Description  " />
                        </div>
                        <TextInput id="description " type="text" placeholder="Description " value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>


                    {/* Event category */}
                    <div className="w-3/5 mb-4">
                        <Label htmlFor="eventCategory" value="Event Category" />
                        <Select
                            id="eventCategory"
                            options={eventOptions}
                            isMulti
                            value={eventCategory}
                            onChange={setEventCategory}
                        />
                    </div>


                    {/* startTime */}
                    <div className="w-3/5 mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="startTime" value="Event Start Time " />
                        </div>
                        <TextInput id="startTime" type="datetime-local" placeholder="Start- Time" required value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                    </div>

                    {/* endTime  */}
                    <div className="w-3/5 mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="endTime" value="Event End Time " />
                        </div>
                        <TextInput id="endTime" type="datetime-local" placeholder="End-Time" required value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                    </div>

                    


                    {/* country */}
                    <div className="w-3/5 mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="Country" value="Country" />

                        </div>
                        <TextInput id="Country" type="text" placeholder="India" disabled />

                    </div>

                    {/* state */}

                    <div className="w-3/5 mb-4">
                        <Label htmlFor="states" value="Select Your State" />
                        <Select
                            id="states"
                            options={statesOption}

                            value={state}
                            onChange={setState}
                        />
                    </div>

                    {/* city */}
                    <div className="w-3/5 mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="city" value="Select your city" />
                        </div>
                        <TextInput id="city" type="text" placeholder="Enter your city" onChange={(e) => setCity(e.target.value)} required />

                    </div>

                    {/* mode  */}
                    <div className="w-3/5 mb-4">
                        <Label htmlFor="mode" value="Select Mode" />
                        <Select
                            id="mode"
                            options={modeOptions}

                            value={mode}
                            onChange={setModes}
                        />
                    </div>

                    {
                        (mode.value === 'online' || mode.value === 'hybrid') && (
                            <div className="w-3/5 mb-4">
                                <div className="mb-2 block">
                                    <Label htmlFor="eventURL" value="Event URL" />
                                </div>
                                <TextInput id="eventURL" type="text" placeholder="Enter Event URL" onChange={(e) => setEventURL(e.target.value)} required />
                            </div>
                        )

                    }

                    {/* Submit Button */}
                    <div className="w-3/5">
                        <Button gradientDuoTone="purpleToPink" type="submit"  >
                            Register
                        </Button>
                    </div>

                </form>
            </div>

            <ToastContainer />
        </>
    );
};

export { AddEvents };