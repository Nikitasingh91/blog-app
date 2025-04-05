import React, { useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import Sidebar from '../dashboard/Sidebar';
import MyProfile from '../dashboard/MyProfile';
import CreateBlog from '../dashboard/CreateBlog';
import Updateblog from '../dashboard/Updateblog';
import MyBlogs from '../dashboard/MyBlogs';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
    const [component, setComponent] = useState("My Blogs")
    const { profiles, isAthenticated } = useAuth()
    console.log(profiles);
    console.log(isAthenticated);
    if (!isAthenticated) {
        return <Navigate to={'/'} />
    }
    return (
        <div><Sidebar component={component} setComponent={setComponent} />
            {component === "My Profile" ? (<MyProfile />) : component === "Create Blog" ? (<CreateBlog />) : component === "Update Blog" ? (<Updateblog />) : <MyBlogs />}
        </div>
    )
}
//user ko athenticate karne ke liye npm i js-cookie install karenge
export default Dashboard