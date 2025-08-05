import { Outlet } from 'react-router-dom';

import Navbar from "./Navbar"
import Footer from './footer';

const UserLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default UserLayout