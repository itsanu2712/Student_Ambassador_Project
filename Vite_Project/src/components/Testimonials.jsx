
const Testimonials = () => {
  // Testimonial data
  const testimonials = [
    { id: 1, name: 'John Doe', text: "Being a Student Ambassador has been an incredible experience. I love connecting with fellow students and helping them succeed." },
    { id: 2, name: 'Jane Smith', text: "I'm grateful for the opportunity to represent our platform as a Student Ambassador. It's rewarding to see the impact we can make together." },
    { id: 3, name: 'Alice Johnson', text: "The Student Ambassador Program has provided me with valuable leadership skills and a supportive community. I highly recommend it to all students." },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {testimonials.map(testimonial => (
        <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-4">
          <p className="text-gray-700">{testimonial.text}</p>
          <p className="text-gray-600 mt-2 font-semibold">{testimonial.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Testimonials;