import { createContext, useState, useEffect } from "react";
import API from "../services/api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const res = await API.get('/users/profile');
                    setUser(res.data.data);
                } catch (error) {
                    logout();
                }
            }
            setLoading(false);
        }

        loadUser();
    }, [token]);

    const login = async (email, password) => {
        const res = await API.post("/auth/login", { email, password });

        const token = res.data.data.token;
        const user = res.data.data.user;

        localStorage.setItem("token", token);

        setToken(token);
        setUser(user);
    };

    const register = async (username, email, password) => {
        const res = await API.post("/auth/register", {
            username,
            email,
            password
        });

        const token = res.data.data.token;
        const user = res.data.data.user;

        localStorage.setItem("token", token);

        setToken(token);
        setUser(user);

        return res.data;
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};