import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import API from "../api/axios.js";
import { useNavigate } from "react-router-dom";

const Login = () =>{
    const [form, setForm] = useState({email: '', password: ''});
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", form);
            login(res.data);
            navigate('/profile');
        } catch (error) {
            const message = error.response?.data?.message|| "Login failed";
            alert(message);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <input 
                type="email" 
                placeholder="Email"
                onChange={(e) => setForm({...form, email: e.target.value})}
            />

            <input 
                type="password"
                placeholder="Password"
                onChange={(e) => setForm({...form, password: e.target.value})}
            />

            <button type="submit">Login</button>
        </form>
    );
};

export default Login