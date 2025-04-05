import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
    const [show, setShow] = useState(false);
    const { isAthenticated, setIsAthenticated, profiles } = useAuth();
    console.log("profile", profiles);

    const navigateTo = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.get("http://localhost:2020/api/user/logout", { withCredentials: true });
            setIsAthenticated(false);
            navigateTo("/login");
        } catch (error) {
            console.log(error);
            toast.error("Failed to logout");
        }
    };

    return (
        <>
            <nav className="shadow-lg px-4 py-3">
                <div className="flex justify-between container mx-auto">
                    <div className="font-semibold text-xl">
                        Cilli<span className="text-blue-500">Blog</span>
                    </div>
                    <div className="mx-6">
                        <ul className="hidden md:flex space-x-6">
                            <Link to="/" className="hover:text-blue-500">HOME</Link>
                            <Link to="/blogs" className="hover:text-blue-500">BLOGS</Link>
                            <Link to="/creators" className="hover:text-blue-500">CREATORS</Link>
                            <Link to="/about" className="hover:text-blue-500">ABOUT</Link>
                            <Link to="/contact" className="hover:text-blue-500">CONTACT</Link>
                        </ul>
                        <div className="md:hidden" onClick={() => setShow(!show)}>
                            {show ? <IoMdClose size={24} /> : <IoMdMenu size={24} />}
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        {isAthenticated && profiles?.user?.role === "admin" ? (
                            <Link
                                to="/dashboard"
                                className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded"
                            >
                                DASHBOARD
                            </Link>
                        ) : (
                            ""
                        )}

                        {!isAthenticated ? (
                            <Link
                                to="/Login"
                                className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
                            >
                                LOGIN
                            </Link>
                        ) : (
                            <div>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
                                >
                                    LOGOUT
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Navbar */}
                {show && (
                    <div className="bg-white">
                        <ul className="flex flex-col h-screen items-center justify-center space-y-3 md:hidden text-xl">
                            <Link to="/" className="hover:text-blue-500" onClick={() => setShow(false)}>HOME</Link>
                            <Link to="/blogs" className="hover:text-blue-500" onClick={() => setShow(false)}>BLOGS</Link>
                            <Link to="/creators" className="hover:text-blue-500" onClick={() => setShow(false)}>CREATORS</Link>
                            <Link to="/about" className="hover:text-blue-500" onClick={() => setShow(false)}>ABOUT</Link>
                            <Link to="/contact" className="hover:text-blue-500" onClick={() => setShow(false)}>CONTACT</Link>
                        </ul>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
