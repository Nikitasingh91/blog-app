import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [blogs, setBlogs] = useState();
    const [profiles, setProfiles] = useState();
    const [profile, setProfile] = useState()
    const [isAthenticated, setIsAthenticated] = useState(false)
    useEffect(() => {
        const fetchProfile = async () => {
            try {

                const { data } = await axios.get(
                    "http://localhost:2020/api/user/myprofile",
                    {
                        withCredentials: true,

                    }
                );
                console.log(data);
                setProfiles(data);
                setProfile(data)
                setIsAthenticated(true)

            } catch (error) {
                console.log(error);
            }
        };


        const fetchBlogs = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:2020/api/blogs/allblog",
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': "application/json"
                        }
                    }
                );
                console.log(res.data);
                setBlogs(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchBlogs();
        fetchProfile()

    }, []);

    return (
        <AuthContext.Provider
            value={{
                profile,
                blogs,
                profiles,
                isAthenticated,
                setProfiles,
                setIsAthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)