import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) =>{
    const { user, loading } = useContext(AuthContext);

    if(loading) return <p>Loading...</p>;

    return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;