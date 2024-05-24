import { Sidebar, Button } from "flowbite-react";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import DashboardComponent from "../components/DashboardComponent.jsx";
import MyEvents from "../components/MyEvents.jsx";
import { useSelector } from "react-redux";
import { AddEvents } from "../components/AddEvent.jsx";
import { useDispatch } from "react-redux";
import { removeUserState } from "../redux/user/userSlicer.js";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const [isOpenSideBar, setIsOpenSideBar] = useState(true);
    const [selectedSection, setSelectedSection] = useState("dashboard");
    const user = useSelector(state => state.user.currentUser);
    const [editedUser, setEditedUser] = useState({ ...user });

    const navigate = useNavigate();
    useEffect(() => {
        if (editedUser === null) {
            navigate("/");
        }
    }, []);

    const dispatch = useDispatch();



    const handleToggleSidebar = () => {
        setIsOpenSideBar(!isOpenSideBar);
    };

    const handleSectionChange = (section) => {
        setSelectedSection(section);
    };

    const handleSignOut = () => {
        console.log("Sign Out")
        // sign out api call
        setEditedUser(null);
        dispatch(removeUserState())
        navigate("/")

    }

    return (
        <>
            <div className="flex flex-row mb-16 text-center">
                <div>
                    {
                        isOpenSideBar ?
                            <Button onClick={handleToggleSidebar}><MdClose /></Button> :
                            <Button onClick={handleToggleSidebar}><FaUser /></Button>
                    }
                    {
                        isOpenSideBar && (
                            <Sidebar aria-label="Sidebar with content separator example">
                                <Sidebar.Items>
                                    <Sidebar.ItemGroup>
                                        <Sidebar.Item onClick={() => handleSectionChange("dashboard")} icon={FaUser}>
                                            Dashboard
                                        </Sidebar.Item>

                                        {
                                            user.role.includes("admin") && (
                                                <>
                                                    <Sidebar.Item onClick={() => handleSectionChange("my-events")} icon={FaUser}>
                                                        My Events
                                                    </Sidebar.Item>
                                                    <Sidebar.Item onClick={() => handleSectionChange("addEvent")} icon={FaUser}>
                                                        Add Event
                                                    </Sidebar.Item>
                                                </>
                                            )
                                        }

                                    </Sidebar.ItemGroup>
                                    <Sidebar.ItemGroup>
                                        <Sidebar.Item onClick={handleSignOut} icon={FaUser}>
                                            Sign Out
                                        </Sidebar.Item>
                                    </Sidebar.ItemGroup>
                                </Sidebar.Items>
                            </Sidebar>
                        )
                    }
                </div>
                <div className="content m-auto">
                    {selectedSection === "dashboard" && <DashboardComponent user={user} />}
                    {selectedSection === "my-events" && <MyEvents />}
                    {selectedSection === "addEvent" && <AddEvents />}
                </div>
            </div>
        </>
    );
};

export default Dashboard;