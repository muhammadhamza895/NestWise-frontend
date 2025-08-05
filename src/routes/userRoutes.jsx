import { Routes, Route } from "react-router"

import UserLayout from "../components/UserLayout"
import Signup from "../components/signup"
import Login from '../components/login';
import ForgotPassword from '../components/forgetpassword';
import ResetPassword from '../components/resetpassword';
import Home from '../pages/Home'
import Properties from '../pages/Properties'
import PropertyDetails from '../components/properties/propertydetail';
import Aboutus from '../pages/About'
import Contact from '../pages/Contact'
import AIPropertyHub from '../pages/Aiagent'

const UserRoutes = () => {
    return (
        <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="user/signup" element={<Signup />} />
            <Route path="user/login" element={<Login />} />
            <Route path="user/forgot-password" element={<ForgotPassword />} />
            <Route path="user/reset/:token" element={<ResetPassword />} />
            <Route path="user/properties" element={<Properties />} />
            <Route path="user/properties/single/:id" element={<PropertyDetails />} />
            <Route path="user/about" element={<Aboutus />} />
            <Route path="user/contact" element={<Contact />} />
            <Route path="user/ai-property-hub" element={<AIPropertyHub />} />
        </Route>
    )
}


export default UserRoutes