
import { citiesArray } from "../constants/citiesArray.js"
import { useState } from 'react';
import axios from "axios"

import { Datepicker, Label } from 'flowbite-react'
import Select from 'react-select'
import Slider from "react-slick";
import { FaCalendarAlt } from "react-icons/fa";
import { MdModeOfTravel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../constants/baseUrl.js";

const SearchBar = () => {

    const [searchQuery, setSearchQuery] = useState('');
    // State for the suggestions
    const [suggestions, setSuggestions] = useState([]);
    const [eventsData, setEventsData] = useState([]);
    const [mainDataNotAltered, setMainDataNotAltered] = useState([]);
    const [mode, setMode] = useState("")
    const [selectedDate, setSelectedDate] = useState(null);

    const navigate = useNavigate();


    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    const options = [
        { value: "Online", label: "Online" },
        { value: "Hybrid", label: "Hybrid" },
        { value: "In-Person", label: "In-Person" },
    ]

    // Handler for handling search input changes
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value === "") {
            setSuggestions([]);
            return;
        }

        const filteredSuggestions = citiesArray.filter((city) =>
            city.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setSuggestions([]);
    };

    // Handler for handling form submission (you can modify this as needed)
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle search functionality here
        console.log("Search query:", searchQuery);
        // if the query is not from the suggestions list, show error message
        if (!citiesArray.includes(searchQuery)) {
            alert("Please enter a valid city name");
            return;
        }

        // call the api


        await axios.post(`${baseUrl}/api/v1/events/searchEventsByQuery?city=${searchQuery}`).then((response) => {
            console.log(response.data);
            setEventsData(response.data.events);
            setMainDataNotAltered(response.data.events);
        }).catch((error) => {
            console.log(error);
        });

    };

    const handleModeChange = (selectedOption) => {
        setMode(selectedOption.value);
        console.log(`Option selected:`, selectedOption.value);
        console.log(mode);

        if (selectedOption.value === "Online") {
            const filteredData = mainDataNotAltered.filter((event) => event.mode === "online");
            setEventsData(filteredData);
        }
        else if (selectedOption.value === "Hybrid") {
            const filteredData = mainDataNotAltered.filter((event) => event.mode === "hybrid");
            setEventsData(filteredData);
        }
        else if (selectedOption.value === "In-Person") {
            const filteredData = mainDataNotAltered.filter((event) => event.mode === "in-person");
            setEventsData(filteredData);
        }
        else {
            setEventsData(mainDataNotAltered);
        }
    };


    const handleDatePickerChange = (date) => {
        setSelectedDate(date);
        const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            
        })

        console.log(formattedDate)
        const filteredData = mainDataNotAltered.filter((event) => {
            // Assuming the event.startTime is also in ISO string format
            const eventDate = new Date(event.startTime).toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                 
            });
            console.log("Event Date: ", eventDate);

            return eventDate === formattedDate;
        });

        console.log("Filtered Data: ", filteredData)
        setEventsData(filteredData);
        console.log("Selected Date: ", date);
    }

    const handleEventCardClick = (id) => {
        console.log("Event ID: ", id);
        navigate(`/event/${id}`)
    }

    return (
        <div className="mt-10 mb-10">
            <form onSubmit={handleSubmit} className="flex items-center justify-center">
                <input
                    type="text"
                    placeholder="Search events in your city, country or state..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className=" w-[50%] text-black border border-gray-300 rounded-l px-4 py-2 focus:outline-none"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r">
                    Search
                </button>
            </form>
            <div className="suggestions-container">
                <ul className="suggestions-list">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="cursor-pointer pb-1">{suggestion}</li>
                    ))}
                </ul>
            </div>

            <div className='flex flex-row justify-center w-full px-8 items-center m-auto'>
                {/*Mode Option*/}
                <div className='m-2'>
                    <Label htmlFor="Mode" value="Mode" />
                    <Select options={options} value={mode ? options.find(option => option.value === mode) : null} placeholder="Mode" onChange={handleModeChange} />
                </div>
                {/*Filter by date */}
                <div className=' w-[40%] m-2'>
                    <Label htmlFor="Filter By Date" value="Filter By Date " />
                    <Datepicker name="selectedDate" onSelectedDateChanged={handleDatePickerChange} />
                </div>
            </div>

            <Slider {...settings} className="w-[90%] m-auto pt-12">
                {eventsData.map((event, index) => (
                    <>
                        <div key={index} className="flex-1 event-card bg-white rounded-lg shadow-xl  overflow-hidden mb-4 mx-2 sm:w-72 md:w-80 lg:w-96 " onClick={() => handleEventCardClick(event._id)}>
                            {/* Event Title */}
                            <h2 className="text-xl font-bold mb-4">{event.title}</h2>
                            {/* Event Image */}
                            <div className="aspect-w-16 aspect-h-9 mb-4 flex justify-center items-center">
                                <img src={event.thumbnail} className="object-cover w-full h-full" alt={event.title} />
                            </div>
                            {/* Event Description */}
                            <p className="text-gray-700 mb-4">{event.description}</p>
                            {/* Event Location */}
                            <div className="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 0a1 1 0 011 1v18l-5-4H3a1 1 0 01-1-1V1a1 1 0 011-1h6zm-3 8v1h6V8H7z" clipRule="evenodd" />
                                </svg>
                                <p className="text-gray-600">{event.city}, {event.state}, {event.country}</p>
                            </div>

                            {/* Event Category */}
                            <div className="flex items-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 0a1 1 0 01.975.776l1.334 6.667 6.622.767a1 1 0 01.553 1.705l-4.803 4.688 1.134 6.612a1 1 0 01-1.451 1.055L10 17.242l-5.864 3.075a1 1 0 01-1.451-1.055l1.134-6.612-4.803-4.688a1 1 0 01.553-1.705l6.622-.767 1.334-6.667A1 1 0 0110 0zm0 2.5a1 1 0 01.248.031l4.52.522-3.305 3.228a1 1 0 01-.29.1l-4.357.504 1.89 1.845a1 1 0 01.297.888l-.446 2.607 4.185-2.196a1 1 0 01.939 0l4.185 2.196-.446-2.607a1 1 0 01.297-.888l1.89-1.845-4.357-.504a1 1 0 01-.29-.1L5.232 3.053l4.52-.522a1 1 0 01.248-.031z" clipRule="evenodd" />
                                </svg>
                                <p className="text-gray-600">{event.eventsCategory}</p>
                            </div>
                            {/* {Mode - online/offline/hybrid} */}
                            <div className="flex flex-row items-center">
                                <MdModeOfTravel />
                                <p>{event.mode}</p>
                            </div>
                            {/* {Time & Date} */}
                            <div className="flex flex-row items-center">
                                <FaCalendarAlt />
                                <p>
                                    {new Date(event.startTime).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                        </div>
                    </>
                ))}
            </Slider>

        </div>
    )
}

export default SearchBar