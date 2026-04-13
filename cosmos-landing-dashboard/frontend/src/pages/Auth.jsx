import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { SiInfracost } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import Image from "../assets/tec-bg-2.jpg";

const Auth = () => {
    const { login, register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (isLogin) {
                await login(email, password);
            } else {
                await register(username, email, password);
            }

            navigate("/dashboard");
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong!")
        } finally {
            setLoading(false);
        };
    };

    return (
        <main className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-6">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img src={Image} alt="image" className="hidden opacity-90 ml-[70px] mt-28 xl:block" />
            </div>

            <div className="relative z-10 bg-[#0e0e0fe3] w-full max-w-[430px] mx-auto border border-[#292929a1] rounded-[32px] px-6 py-6 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                        <SiInfracost className="text-2xl text-white" />
                    </div>
                    <h2 className="text-3xl font-extralight tracking-[0.4em] text-white">
                        COSMOS
                    </h2>
                    <p className="mt-2 text-zinc-400 uppercase text-[11px] tracking-[0.4em]">
                        AUTHENTICATION PORTAL
                    </p>
                </div>

                <div className="mt-6 relative border-b border-[#3a3a3a]">
                    <div className="grid grid-cols-2 text-[13px] xl:text-[14px] text-center">
                        <button
                            type="button"
                            className={`py-4 font-semibold tracking-widest ${isLogin ? "text-white" : "text-zinc-500"}`}
                            onClick={() => {
                                setIsLogin(true);
                                setError("");
                                setUsername("");
                                setEmail("");
                                setPassword("");
                            }}
                        >
                            SIGN IN
                        </button>
                        <button
                            type="button"
                            className={`py-4 font-semibold tracking-widest ${!isLogin ? "text-white" : "text-zinc-500"}`}
                            onClick={() => {
                                setIsLogin(false);
                                setError("");
                                setUsername("");
                                setEmail("");
                                setPassword("");
                            }}
                        >
                            SIGN UP
                        </button>
                    </div>
                    <span className={`absolute bottom-0 h-[2px] bg-white transition-all duration-300 ease-in-out ${isLogin ? "left-0 w-1/2" : "left-1/2 w-1/2"}`}></span>
                </div>

                <form onSubmit={handleSubmit} className="mt-1">
                    <p className="text-[#ff6767] text-[14px] h-8 flex justify-center items-center tracking-wider">
                        {error}
                    </p>

                    {!isLogin && (
                        <div className="flex flex-col gap-2 mb-3">
                            <label className="text-[11px] uppercase tracking-[0.35em] text-zinc-500 font-semibold">
                                FULL NAME
                            </label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={`input ${error ? "!border-[#ff6767] focus:shadow-[0_0_10px_#ff6767]" : ""}`}
                                placeholder="Makanyaga Abdul"
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-2 mb-3">
                        <label className="text-[11px] uppercase tracking-[0.35em] text-zinc-500 font-semibold">
                            EMAIL
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`input ${error ? "!border-[#ff6767] focus:shadow-[0_0_10px_#ff6767]" : ""}`}
                            placeholder="you@universe.com"
                        />
                    </div>

                    <div className="flex flex-col gap-2 mb-3">
                        <div className="flex items-center justify-between">
                            <label className="text-[11px] uppercase tracking-[0.35em] text-zinc-500 font-semibold">
                                PASSWORD
                            </label>
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-[11px] font-semibold text-zinc-500 hover:text-[#ffe600de] cursor-pointer select-none"
                            >
                                {showPassword ? "HIDE" : "SHOW"}
                            </span>
                        </div>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`input ${error ? "!border-[#ff6767] focus:shadow-[0_0_10px_#ff6767]" : ""}`}
                            placeholder="......"
                        />
                    </div>

                    {isLogin && (
                        <div className="flex items-center justify-between mt-3 mb-3">
                            <span>
                                <input type="checkbox" id="checkbox" className="mr-2"/>
                                <label
                                    htmlFor="checkbox" 
                                    className="text-zinc-400 cursor-pointer"
                                >
                                    Remember me
                                </label>
                            </span>
                            <span className="text-zinc-400 cursor-pointer">
                                Forgot password?
                            </span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#ffe600] flex justify-center items-center text-black w-full py-4 mt-4 rounded-[14px] font-semibold tracking-widest shadow-[0_20px_40px_rgba(255,230,0,0.25)]"
                    >
                        {loading ? (
                            <div className="loader w-5 xl:w-6"></div>
                        ) : isLogin ? (
                            "LAUNCH SIGN IN"
                        ) : (
                            "CREATE ACCOUNT"
                        )}
                    </button>

                    <div className="flex items-center mt-6 gap-3">
                        <span className="flex-1 border-b border-[#292929a1]"></span>
                        <span className="text-zinc-400 text-[12px] tracking-[0.35em] uppercase text-center">
                            {isLogin ? "or continue with" : "or sign up with"}
                        </span>
                        <span className="flex-1 border-b border-[#292929a1]"></span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <button type="button" className="social">
                            <FcGoogle className="text-xl" />
                            Google
                        </button>
                        <button type="button" className="social">
                            <FaApple className="text-xl" />
                            Apple
                        </button>
                    </div>

                    <span className="inline-block border-b w-full border-[#292929a1] mt-6"></span>
                    <div className="flex justify-center gap-1 mt-3">
                        <span className="text-zinc-400">
                            {isLogin ? "Don't have an account?" : "Already have an account"}
                        </span>
                        <span onClick={() => {
                            setIsLogin(!isLogin);
                            setError("");
                            setUsername("");
                            setEmail("");
                            setPassword("");
                        }}
                            className="cursor-pointer hover:text-white"
                        >
                            {isLogin ? "Sign up" : "Sign in"}
                        </span>
                    </div>
                </form>
            </div>
        </main >
    );
};

export default Auth;