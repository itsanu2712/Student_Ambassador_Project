
const EventCard = ({ event }) => {
    // Capitalize the first letter of the event title
    const capitalizedTitle = event.title && event.title.charAt(0).toUpperCase() + event.title.slice(1);

    return (
        <div className="event-card bg-white rounded-lg shadow-md overflow-hidden mb-4 mx-2 sm:w-72 md:w-80 lg:w-96">
            {/* Event Title */}
            <h2 className="text-xl font-bold mb-4">{capitalizedTitle}</h2>
            {/* Event Image */}
            <div className="aspect-w-16 aspect-h-9 mb-4 flex justify-center items-center">
                <img src="https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg?size=626&ext=jpg" className="object-cover w-full h-full" alt={event.title} />
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
            {/* Event Ratings */}
            <div className="flex items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2 3a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm10 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V3zM2 13a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2zm10 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-600">Rating: {event.ratings}</p>
            </div>
            {/* Event Category */}
            <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 0a1 1 0 01.975.776l1.334 6.667 6.622.767a1 1 0 01.553 1.705l-4.803 4.688 1.134 6.612a1 1 0 01-1.451 1.055L10 17.242l-5.864 3.075a1 1 0 01-1.451-1.055l1.134-6.612-4.803-4.688a1 1 0 01.553-1.705l6.622-.767 1.334-6.667A1 1 0 0110 0zm0 2.5a1 1 0 01.248.031l4.52.522-3.305 3.228a1 1 0 01-.29.1l-4.357.504 1.89 1.845a1 1 0 01.297.888l-.446 2.607 4.185-2.196a1 1 0 01.939 0l4.185 2.196-.446-2.607a1 1 0 01.297-.888l1.89-1.845-4.357-.504a1 1 0 01-.29-.1L5.232 3.053l4.52-.522a1 1 0 01.248-.031z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-600">Category: {event.eventsCategory}</p>
            </div>
        </div>
    );
};

export default EventCard;