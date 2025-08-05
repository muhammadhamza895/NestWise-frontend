import { Route } from "react-router"

// Components
import AdminProtectedRoute from "../adminComponents/AdminProtectedRoute"
import AdminLayout from "../adminPages/AdminLayout"
import AdminLogin from "../adminPages/AdminLogin"
import AdminSignup from "../adminPages/AdminSIgnup"
import AdminDashboard from "../adminPages/AdminDashboard"
import AdminPropertyList from "../adminPages/AdminPropertyList"
import AdminPropertyAdd from "../adminPages/AdminPropertyAdd"
import AdminAppointments from "../adminPages/AdminAppointments"

const AdminRoutes = () => {
    return (
        <Route path="/admin" element={<AdminLayout />}>
            <Route path="login" element={<AdminLogin />} />
            <Route path="signup" element={<AdminSignup />} />

            <Route element={<AdminProtectedRoute />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="list" element={<AdminPropertyList />} />
                <Route path="add" element={<AdminPropertyAdd />} />
                <Route path="appointments" element={<AdminAppointments />} />
            </Route>

        </Route>
    )
}

export default AdminRoutes