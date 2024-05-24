import { useEffect, useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import {  useNavigate } from 'react-router-dom';

const DashboardComponent = ({user}) => {
    const navigate = useNavigate();
    
    useEffect(() => {
        // Make API call to fetch user data
        // You can dispatch an action to update state or perform other actions as needed
        if(user === null) {
            navigate("/");
        }
    }, [user]);

    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ ...user });

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name + " gap " +  value);
        setEditedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(editedUser)
        setIsEditing(true);
    };

    const handleUpdateUser = () => {
        // Make API call to update user using editedUser data
        console.log("Updated User Data:", editedUser);
        // You can dispatch an action to update state or perform other actions as needed
        setIsEditing(false);
    };

    return (
        <div className="flex items-center flex-col justify-center max-w-xl p-8 w-[25rem] ">
            {/* Profile Picture */}
            <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
                <img src={editedUser.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>

            

            {/* User Info Form */}
            <form className=" w-[100%] flex flex-col items-center py-12">
                <div className="w-[100%] mb-4 flex justify-between items-center">
                    <div className="mb-2 block">
                        <Label htmlFor="firstname" value="First Name" />
                    </div>
                    <TextInput id="firstname"  name='firstname' type="text" placeholder={editedUser.firstname} required onChange={handleInputChange} />
                </div>
                <div className="w-[100%] mb-4 flex justify-between items-center">
                    <div className="mb-2 block">
                        <Label htmlFor="lastname" value="Last Name" />
                    </div>
                    <TextInput id="lastname"  name='lastname' type="text" placeholder={editedUser.lastname} required onChange={handleInputChange} />
                </div>
                <div className="w-[100%] mb-4 flex justify-between items-center">
                    <div className="mb-2 block">
                        <Label htmlFor="username" value="User Name" />
                    </div>
                    <TextInput id="username"  name='username' type="text" placeholder={editedUser.username} required onChange={handleInputChange} />
                </div>
                <div className="w-[100%] mb-4 flex justify-between items-center">
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput id="email"  name='email' type="email" placeholder={editedUser.email} required onChange={handleInputChange} />
                </div>
                <div className="w-[100%] mb-4 flex justify-between items-center">
                    <div className="mb-2 block">
                        <Label htmlFor="phonenumber" value="Phone Number" />
                    </div>
                    <TextInput id="phonenumber"  name='phonenumber' type="number" placeholder={editedUser.phonenumber} required onChange={handleInputChange} />
                </div>
                
                
                {/* Add more input fields for other user information */}
                {isEditing && (
                    <Button type="button" onClick={handleUpdateUser} className="btn-primary">
                        Save Changes
                    </Button>
                )}
            </form>
        </div>

    );
};

export default DashboardComponent;