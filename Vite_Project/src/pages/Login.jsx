import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import axios from "axios"

import { saveUserState } from "../redux/user/userSlicer.js";
import { ToastContainer, toast } from "react-toastify";
import { baseUrl } from "../constants/baseUrl.js";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginUser = async (e) => {
    e.preventDefault()
    if (email === "" || password === "") {
      toast("Please fill all fields", { type: "error" })
      // setError("Please fill all fields")
    }

    else {
      const user = {

        email: email.toUpperCase(),
        password: password
      }

      
      axios.defaults.withCredentials = true;

      await axios.post(`${baseUrl}/api/v1/user/login`, user).then((res) => {
        console.log(res.data)
        // setError(res.data.message)
        toast(res.data.message, { type: "success" })
        dispatch(saveUserState(res.data.data))
        navigate("/")
      })
        .catch((error) => {
          console.log(error)
          // setError(error.response.data.message)
          toast(error.response.data.message, { type: "error" })
        })

    }
  }

  return (
    <>
    <form className="w-[100%] flex flex-col items-center py-12">



      <div className="w-3/5 mb-4">
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput id="email1" type="email" placeholder="name@flowbite.com" required onChange={(e) => {
          setEmail(e.target.value)
        }} />
      </div>


      <div className="w-3/5 mb-4">
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput id="password1" type="password" required onChange={(e) => {
          setPassword(e.target.value)
        }} />
      </div>
      <div className="flex items-center gap-2 w-3/5 mb-4">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>

      <div className="">
        <Button gradientDuoTone="purpleToPink" type="submit" onClick={handleLoginUser}>
          Log In
        </Button>
      </div>
      <div className="text-xl" >
        Don &apos t have an account? <a href="/register" className="text-blue-500">Register Here</a>
      </div>

      
    </form>
    <ToastContainer />
    </>
  );
}


export { Login };