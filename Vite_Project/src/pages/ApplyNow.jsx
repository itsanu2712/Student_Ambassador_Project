import { useState } from 'react';
import { Label, TextInput } from 'flowbite-react';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../constants/baseUrl';

const ApplyNow = () => {
  // const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    college: '',
    city: '',
    phone: '',
    gender: '',
    codingProfile: '',
    github: '',
    linkedin: '',
    resumeUrl: '',
    aboutMe: '',
    whyApply: '',
    videoUrl: '',
    confirmed: false,
  });

  const genderOptions = [
    { value: 'Female', label: 'Female' },
    { value: 'Male', label: 'Male' },
    { value: 'Other', label: 'Other' }
  ]
  const [step, setStep] = useState(1);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleGenderChange = (selectedOption) => {
    setFormData({ ...formData, gender: selectedOption.value });
    console.log(`Option selected:`, selectedOption);
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    if (!formData.confirmed) {
      toast("Please confirm the information", { type: "error" })
      return;
    }

    try {
      await axios.post(`${baseUrl}/api/v1/events/sendMail`, {
        email: formData.email,
        title: "Career Corps || Student Ambassador Application Form",
        body: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
              <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                  <h1 style="color: #333333; font-size: 24px; font-weight: bold; margin-bottom: 20px;">Student Ambassador Application Form</h1>
                  <p style="color: #555555; font-size: 16px;">Hello ${formData.firstName} ${formData.lastName},</p>
                  <p style="color: #555555; font-size: 16px;">Your information has been successfully submitted.</p>
                  <p style="color: #555555; font-size: 16px;">We will contact you shortly with further details.</p>

                  <div style="margin-top: 20px; padding: 10px; background-color: #ffffff; border-radius: 5px; border: 1px solid #dddddd;">

                      <p style="color: #333333; font-size: 18px; font-weight: bold; margin-bottom: 10px;">Personal Information:</p>
                      <p style="color: #555555; font-size: 16px; margin-bottom: 5px;">Name: ${formData.firstName} ${formData.lastName}</p>
                      <p style="color: #555555; font-size: 16px; margin-bottom: 5px;">Email: ${formData.email}</p>
                      <p style="color: #555555; font-size: 16px; margin-bottom: 5px;">College: ${formData.college}</p>
                      <p style="color: #555555; font-size: 16px; margin-bottom: 5px;">City: ${formData.city}</p>
                      <p style="color: #555555; font-size: 16px; margin-bottom: 5px;">Phone: ${formData.phone}</p>
                      

                      <p style="color: #333333; font-size: 18px; font-weight: bold; margin-top: 20px; margin-bottom: 10px;">Coding Profiles:</p>
                      <p style="color: #555555; font-size: 16px; margin-bottom: 5px;">Any Coding Profile: ${formData.codingProfile}</p>
                      <p style="color: #555555; font-size: 16px; margin-bottom: 5px;">GitHub: ${formData.github}</p>  
                      <p style="color: #555555; font-size: 16px; margin-bottom: 5px;">LinkedIn: ${formData.linkedin}</p>
                      <p style="color: #555555; font-size: 16px; margin-bottom: 5px;">Resume URL: ${formData.resumeUrl}</p>


                      <p style="color: #333333; font-size: 18px; font-weight: bold; margin-top: 20px; margin-bottom: 10px;">Basic Questions:</p>
                      <p style="color: #555555; font-size: 16px; margin-bottom: 5px;">About Me: ${formData.aboutMe}</p>
                      <p style="color: #555555; font-size: 16px; margin-bottom: 5px;">Why Apply: ${formData.whyApply}</p>
                      <p style="color: #555555; font-size: 16px; margin-bottom: 5px;">Video URL: ${formData.videoUrl}</p>

                  </div>



              </div>
          </div>
        `
      });
      toast("RSVP Submitted Successfully", { type: "success" });
    } catch (error) {
      console.log(error);
      toast("Error submitting RSVP. Please try again later.", { type: "error" });
    }

    // You can add your submission logic here, such as sending the data to a server
    console.log(formData);
    toast("Application submitted successfully", { type: "success" });

  };

  const handleDisableNext = () => {
    toast("Please fill all fields", { type: "error" })
  }

  return (
    <div>
      <div className='m-4 p-8 bg-yellow-400 text-black rounded-lg'>
        <h1 className="text-2xl font-bold mb-6 text-center">Student Ambassador Application</h1>
      </div>
      <div className="mx-auto bg-gray-100 rounded shadow-lg p-8">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="mb-6">
              {/* Personal information input fields */}
              <div className='flex justify-center flex-col items-center '>
                <h2 className="text-xl font-bold mb-2">Personal Information</h2>
                {/* firstname */}
                <div className="w-3/5 mb-4">
                  <div className="mb-2 block">
                    <Label htmlFor="firstname" value="First Name" />
                  </div>
                  <TextInput id="firstname" name='firstName' type="text" placeholder="John" required onChange={handleChange} value={formData.firstName} />
                </div>
                {/* lastname */}
                <div className="w-3/5 mb-4">
                  <div className="mb-2 block">
                    <Label htmlFor="lastname" value='Last Name' />
                  </div>
                  <TextInput id="lastname" name='lastName' type="text" placeholder="Doe" required onChange={handleChange} value={formData.lastName} />
                </div>
                {/* email */}
                <div className="w-3/5 mb-4">
                  <div className="mb-2 block">
                    <Label htmlFor="email" value='Email' />
                  </div>
                  <TextInput id="email" name='email' type="email" placeholder="johndoe@gmail.com" required onChange={handleChange} value={formData.email} />
                </div>
                {/* college name */}
                <div className="w-3/5 mb-4">
                  <div className="mb-2 block">
                    <Label htmlFor="collegeName" value='College Name' />
                  </div>
                  <TextInput id="collegeName" name='college' type="text" placeholder="IIT Kanpur" required onChange={handleChange} value={formData.college} />
                </div>
                {/* city */}
                <div className="w-3/5 mb-4">
                  <div className="mb-2 block">
                    <Label htmlFor="city" value='City' />
                  </div>
                  <TextInput id="city" name='city' type="text" placeholder="Kanpur, Uttar Pradesh" required onChange={handleChange} value={formData.city} />
                </div>
                {/* phone */}
                <div className="w-3/5 mb-4">
                  <div className="mb-2 block">
                    <Label htmlFor="phone" value='Phone Number' />
                  </div>
                  <TextInput id="phone" name='phone' type="number" placeholder="+91-000000000" required onChange={handleChange} value={formData.phone} />
                </div>
                {/* Gender */}
                <div className="w-3/5 mb-4">
                  <div className="mb-2 block">
                    <Label htmlFor="gender" value='Gender' />
                  </div>
                  <Select
                    id="gender"
                    options={genderOptions}
                    value={genderOptions.find(option => option.value === formData.gender)}
                    onChange={handleGenderChange}
                  />
                </div>

              </div>
              <div className="flex justify-between items-center m-auto w-3/5">
                <button type="button" disabled className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded cursor-not-allowed">
                  Previous
                </button>

                {/* Other personal info input fields */}
                {
                  formData.firstName && formData.lastName && formData.email && formData.college && formData.city && formData.phone && formData.gender ? (
                    <button type="button" onClick={handleNext} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Next
                    </button>
                  )
                    : (
                      <button type="button" onClick={handleDisableNext} className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded cursor-not-allowed hover:bg-gray-300 hover:text-gray-700"
                      >
                        Next
                      </button>
                    )
                }
              </div>
            </div>
          )}

          {/* Step 2: Profiles */}
          {step === 2 && (
            <div className="mb-6">
              <div className='flex justify-center flex-col items-center '>
                <h2 className="text-xl font-bold mb-2">Coding Profiles</h2>
                {/* Coding Profile */}
                {/* Any Coding Profile */}
                <div className="w-3/5 mb-4">
                  <div className="mb-2 block">
                    <Label htmlFor="anyProfile" value='Any Coding Profile URL *' />
                  </div>
                  <TextInput id="anyProfile" name='codingProfile' type="url" placeholder="https://leetcode.com/xyz" required onChange={handleChange} value={formData.codingProfile} />
                </div>
                {/* GitHub */}
                <div className="w-3/5 mb-4">
                  <div className="mb-2 block">
                    <Label htmlFor="github" value='GitHub URL *' />
                  </div>
                  <TextInput id="github" name='github' type="url" placeholder="https://github.com/xyz" required onChange={handleChange} value={formData.github} />
                </div>
                {/* LinkedIn */}
                <div className="w-3/5 mb-4">
                  <div className="mb-2 block">
                    <Label htmlFor="linkedin" value='LinkedIn URL *' />
                  </div>
                  <TextInput id="linkedin" name='linkedin' type="url" placeholder="https://linkedin.com/xyz" required onChange={handleChange} value={formData.linkedin} />
                </div>
                {/* Resume Link */}
                <div className="w-3/5 mb-4">
                  <div className="mb-2 block">
                    <Label htmlFor="resumeUrl" value='Resume URL *' />
                  </div>
                  <TextInput id="resumeUrl" name='resumeUrl' type="url" placeholder="Upload on Drive (Share the Public Link)" required onChange={handleChange} value={formData.resumeUrl} />
                </div>
              </div>

              <div className="flex justify-between items-center m-auto w-3/5">
                <button type="button" onClick={handlePrev} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Previous
                </button>

                {
                  formData.codingProfile && formData.github && formData.linkedin && formData.resumeUrl ? (

                    <button type="button" onClick={handleNext} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Next
                    </button>
                  ) :
                    (
                      <button type="button" onClick={handleDisableNext} className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded cursor-not-allowed hover:bg-gray-300 hover:text-gray-700">
                        Next
                      </button>
                    )
                }
              </div>
            </div>
          )}

          {/* Step 3: Basic Questions */}
          {step === 3 && (
            <div className="mb-6">
              <div className='flex justify-center flex-col items-center '>
                <h2 className="text-xl font-bold mb-2">Basic Questions</h2>
                {/* About Me */}
                <div className="w-3/5 mb-4">
                  <div className="mb-2 block">
                    <Label htmlFor="aboutMe" value='Tell us about yourself' />
                  </div>
                  <TextInput id="aboutMe" name='aboutMe' type="text" placeholder="I am a tech enthusiast..." required onChange={handleChange} value={formData.aboutMe} />
                </div>
                {/* Why Apply */}
                <div className="w-3/5 mb-4">
                  <div className="mb-2 block">
                    <Label htmlFor="whyApply" value='Why do you want to apply?' />
                  </div>
                  <TextInput id="whyApply" name='whyApply' type="text" placeholder="I want to be a part of this program because..." required onChange={handleChange} value={formData.whyApply} />
                </div>
                {/* Video URL */}
                <div className="w-3/5 mb-4">
                  <div className="mb-2 block">
                    <Label htmlFor="videoUrl" value='Video URL' />
                  </div>
                  <TextInput id="videoUrl" name='videoUrl' type="url" placeholder="Upload a video on YouTube (Share the Public Link)" required onChange={handleChange} value={formData.videoUrl} />
                </div>

              </div>

              {/* Basic questions input fields */}
              <div className="flex justify-between items-center m-auto w-3/5">
                <button type="button" onClick={handlePrev} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Previous
                </button>

                {
                  formData.aboutMe && formData.whyApply && formData.videoUrl ? (

                    <button type="button" onClick={handleNext} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Next
                    </button>
                  ) :
                    (
                      <button type="button" onClick={handleDisableNext} className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded cursor-not-allowed hover:bg-gray-300 hover:text-gray-700">
                        Next
                      </button>
                    )
                }
              </div>
            </div>
          )}

          {/* Confirmation Section */}
          {step === 4 && (
            <div className="mb-6">
              <div className='flex justify-center flex-col items-center '>
                <h2 className="text-2xl font-bold mb-2">Confirmation</h2>
                <div className="mb-2 block">
                  <label htmlFor="confirmed" className="flex items-center">
                    <input
                      type="checkbox"
                      id="confirmed"
                      name="confirmed"
                      checked={formData.confirmed}
                      onChange={handleChange}
                      className="form-checkbox mr-2 "
                    />
                    <span className="text-md">I hereby confirm that the information provided is accurate.</span>
                  </label>
                </div>
              </div>
              {/* Confirmation input field */}
              <div className="flex justify-between items-center m-auto w-3/5">
                <button type="button" onClick={handlePrev} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Previous
                </button>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
      <ToastContainer />

    </div>
  );
};

export { ApplyNow };