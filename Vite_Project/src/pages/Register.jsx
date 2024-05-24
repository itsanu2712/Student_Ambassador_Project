import { Label, FileInput, TextInput, Button } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';   
import { baseUrl } from "../constants/baseUrl";


const Register = () => {

    const navigate = useNavigate()

    const [error, setError] = useState("");
    const [avatar, setAvatar] = useState();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("");
    const [DateOfBirth, setDateOfBirth] = useState("");
    const [companyName, setCompanyName] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call your API using Axios here, with the form data
        try {
            if (password !== confirmPassword) {
                setError('Passwords do not match')
                console.error('Passwords do not match');
                return;
            }

            setError('Loading.........')
            const formData = new FormData();
            formData.append('avatar', avatar);
            formData.append('firstname', firstname);
            formData.append('lastname', lastname);
            formData.append('username', username);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('phonenumber', phoneNumber);
            formData.append('dob', DateOfBirth);
            formData.append('companyname', companyName);
            formData.append('role', ['user'])

            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            };

            const response = await axios.post(`${baseUrl}/api/v1/user/register`, formData, config);
            console.log('API Response:', response.data);
            setError(response.data.messsage + "Loading.....")
            
            // toast.success("User Registered Successfully!", {position: "top-right", autoClose: 2000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored"});

            toast("User Registered Successfully", { type: "success" })
            window.location.href = "/login"
            // navigate("/login")
            // Add any additional handling after API call
        } catch (error) {
            setError(error.response.data.message)
            console.error('API Error:', error.response.data.message);
            // Handle API error
        }
    };



    return (
        <>
            <div className="w-[100%] flex flex-col items-center py-12">
                <h1 className="text-3xl font-bold mb-4">Register</h1>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form className="w-[100%] flex flex-col items-center py-12" onSubmit={handleSubmit}>
                    {/* upload file - avatar */}
                    <div className="mb-4 w-3/5">
                        <div>
                            <Label htmlFor="avatar" value="Upload Your Avatar" />
                        </div>
                        <FileInput id="avatar" sizing="lg" onChange={(e) => setAvatar(e.target.files[0])} />
                    </div>

                    {/* First name*/}
                    <div className="w-3/5 mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="First name" value="Your First name" />
                        </div>
                        <TextInput id="First name" type="text" placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    </div>


                    {/* Last name*/}
                    <div className="w-3/5 mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="Last name" value="Your Last name" />
                        </div>
                        <TextInput id="Last name" type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    </div>


                    {/* User name */}
                    <div className="w-3/5 mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="username" value="Your Username (Unique)" />
                        </div>
                        <TextInput id="username" type="text" placeholder="Sakshi123" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    {/* Email */}
                    <div className="w-3/5 mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Your Email" />
                        </div>
                        <TextInput id="email" type="email" placeholder="abc@abc.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    {/* Password */}
                    <div className="w-3/5 mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Your Password" />
                        </div>
                        <TextInput id="password" type="password" placeholder="Must Include (!@#$%^&*())" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    {/* Confirm Password */}
                    <div className="w-3/5 mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="confirmPassword" value="Your Confirm Password" />
                        </div>
                        <TextInput id="confirmPassword" type="password" placeholder="Must Be same as upper" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    {/* Phone no. */}
                    <div className="w-3/5 mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="phoneNumber" value="Your Phone Number" />
                        </div>
                        <TextInput id="phoneNumber" type="phoneNumber" placeholder="+91 5416625431" required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>

                    {/* DOB */}
                    <div className="w-3/5 mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="DateOfBirth" value="Your Date of Birth" />
                        </div>
                        <TextInput id="DateOfBirth" type="date" placeholder="03/09/2002" required value={DateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                    </div>

                    {/* Confirm Password */}
                    <div className="w-3/5 mb-4">
                        <div className="mb-2 block">
                            <Label htmlFor="companyName" value="Your Company Name" />
                        </div>
                        <TextInput id="companyName" type="companyName" placeholder="Company" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                    </div>

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

export { Register };