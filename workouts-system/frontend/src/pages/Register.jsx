import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import API from "../services/api.js"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner.jsx"

const Register = () => {
    const [formData, setFormData] = useState({
        names: '',
        email: '',
        password: ''
    })
    const { register, loading } = useContext(AuthContext)
    const Navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/auth/', formData)
            register(res.user)
            Navigate('/dashboard')
        } catch (error) {
            const message = error.response?.data?.message
            toast.error(message)
        }
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <input
                            type="text"
                            placeholder="Enter full name"
                            value={names}
                            onChange={(e) => setFormData((prevState) => [{ ...prevState, names: e.target.value }])}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setFormData((prevState) => [{ ...prevState, email: e.target.value }])}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setFormData((prevState) => [{ ...prevState, password: e.target.value }])}
                        />
                    </div>
                </div>
                <button type="submit">Register</button>
            </form>

        </div>
    )

}

export default Register;