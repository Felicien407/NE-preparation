import { useContext } from "react";
import { Navigate } from "react-router-dom"
import API from "../services/api.js"
import { AuthContext } from "../context/AuthContext.jsx"
import Spinner from "./Spinner.jsx"

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return <Spinner />
    }
    return user ? children : <Navigate to={'/login'} />
}

export default ProtectedRoute;