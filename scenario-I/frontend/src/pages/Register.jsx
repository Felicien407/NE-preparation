import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import API from "../api/axios.js";
import { useNavigate } from "react-router-dom";

const Register = () =>{
    const [form, setForm] = useState({username: '', email: '', password: ''});
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            const res = await API.post('/auth/register', form);
            register(res.data);
            navigate('/profile');
        } catch (error) {
            const message = error.response?.data?.message || 'Signup Failed!';
            alert(message);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            <input 
                type="text"
                placeholder="Username"
                onChange={(e)=> setForm({...form, username: e.target.value})}
            />

            <input 
                type="email"
                placeholder="email"
                onChange={(e)=> setForm({...form, email: e.target.value})}
            />

            <input 
                type="password"
                placeholder="password"
                onChange={(e)=> setForm({...form, password: e.target.value})}
            />

            <button type="submit">Register</button>
        </form>
    )
}

export default Register;