import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Blogs from './pages/Blogs'
import About from './pages/About'
import Contact from './pages/Contact'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { useAuth } from './context/AuthProvider'
import Creators from './pages/Creators'
import { Toaster } from 'react-hot-toast'
import UpdateBlog from './dashboard/Updateblog'
import DetailPage from './pages/DetailPage'
import Notfound from './pages/Notfound'
const App = () => {
  const location = useLocation()
  const hindNavbarFooter = ["/dashboard", "/login", "/register"].includes(location.pathname)
  const { blogs, isAthenticated } = useAuth()
  console.log(blogs);
  console.log("app", isAthenticated);

  return (
    <div>
      {!hindNavbarFooter && <Navbar />}
      <Routes>
        <Route exact path="/" element={isAthenticated === true ? <Home /> : <Navigate to={"/login"} />} />
        <Route exact path="/blogs" element={<Blogs />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/creators" element={<Creators />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/blog/update/:id" element={<UpdateBlog />} />
        {/*single page route*/}
        <Route exact path='/blog/:id' element={<DetailPage />} />

        <Route exact path='*' element={<Notfound />} />
      </Routes>
      <Toaster />
      {!hindNavbarFooter && < Footer />}
    </div>
  )




}

export default App