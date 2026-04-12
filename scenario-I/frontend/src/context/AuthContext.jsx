import { createContext, useState, useEffect } from "react";
import API from "../api/axios.js";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async ()=>{
            try {
                const token = localStorage.getItem('token')
                if(!token){
                    setLoading(false);
                    return;
                }

                const res = await API.get('/auth/me');
                setUser(res.data);
            } catch (error) {
                localStorage.removeItem('token');
                setUser(null);
            } finally{
                setLoading(false);
            }
        }
        
        loadUser();
    }, [])

    const register = (data)=>{
        localStorage.setItem('token', data.token);
        setUser(data.user);
    }

    const login = (data)=>{
        localStorage.setItem('token', data.token);
        setUser(data.user);
    }

    const logout = () =>{
        localStorage.removeItem('token');
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
