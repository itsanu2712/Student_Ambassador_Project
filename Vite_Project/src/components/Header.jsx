import { Button, Navbar, Dropdown, Avatar } from "flowbite-react";
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux' 
import { removeUserState } from "../redux/user/userSlicer.js";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";


const Header = () =>
 {
   const user = useSelector(state => state.user.currentUser) 
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(user);
  const [isLoggedin, setIsLoggedin] = useState(false)

  useEffect(() => {
      if (user && user !== null) {
          setIsLoggedin(true)
      }
  }, [user])

  const handleSignOut = () => {
      // sign out api call
      dispatch(removeUserState())
      navigate("/login")
      setIsLoggedin(false)

      // dispatch action to clear user state
      
  }

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <img src="/icons8-student-30.png" className="mr-3 h-6 sm:h-9" alt="" />
     <span className="self-center whitespace-nowrap text-md md:text-lg font-semibold dark:text-white">CareerCorps Student Ambassdor</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
      {
                        isLoggedin ?
                            (<Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    <Avatar alt="User settings" img={user.avatar} rounded />
                                }
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm">{user.firstname} {user.lastname}</span>
                                    <span className="block truncate text-sm font-medium">{user.email}</span>
                                </Dropdown.Header>
                                <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
                            </Dropdown>) :
                            (
                   
                           <Button gradientDuoTone="purpleToPink" href="/login">Log IN</Button>
                            )
 }
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/about">About</Navbar.Link>

        <Navbar.Link href="/allAmbassadors">Ambassadors</Navbar.Link>
        
      </Navbar.Collapse>
    </Navbar>
  );
}
 export {Header}