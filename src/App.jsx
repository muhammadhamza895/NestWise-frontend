import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import StructuredData from './components/SEO/StructuredData';
import 'react-toastify/dist/ReactToastify.css';

//Routes
import AdminRoutes from './routes/adminRoutes';
import UserRoutes from './routes/userRoutes';
import NotFoundPage from "./components/Notfound"

export const Backendurl = import.meta.env.VITE_API_BASE_URL;

const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          {/* Base website structured data */}
          <StructuredData type="website" />
          <StructuredData type="organization" />


          <Routes>
            {UserRoutes()}
            {AdminRoutes()}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <ToastContainer />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App