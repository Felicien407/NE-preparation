import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const Profile = () =>{
    const {user, logout} = useContext(AuthContext);

    return (
        <div>
            <h1>User Profile</h1>
            <p>Welcome, {user?.username}</p>

            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Profile;