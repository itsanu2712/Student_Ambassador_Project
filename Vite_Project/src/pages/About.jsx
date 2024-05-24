import Testimonials from '../components/Testimonials';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Student Ambassador Program</h2>
        <p className="text-gray-700">
          Our Student Ambassador Program is designed to empower students to become leaders in their communities. Ambassadors play a vital role in promoting our platform and supporting fellow students in their educational journey.
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Testimonials</h2>
        <Testimonials />
      </div>
    </div>
  );
}

export default About;