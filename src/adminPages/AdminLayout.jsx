import { Outlet } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { ErrorBoundary } from "react-error-boundary";
import { motion, AnimatePresence } from "framer-motion";

// Components
import AdminNavbar from '../adminComponents/AdminNavbar';
import AdminErrorFallback from '../adminComponents/AdminErrorFallback';

// Config
export const backendurl = import.meta.env.VITE_API_BASE_URL;

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
};

function AdminLayout() {
    return (
        <ErrorBoundary
            FallbackComponent={AdminErrorFallback}
            onReset={() => window.location.reload()}
        >
            <div className="min-h-screen bg-gray-50">
                <AdminNavbar />
                <AnimatePresence mode="wait">
                    <motion.div
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                        transition={{ duration: 0.3 }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>

                {/* Toast Notifications */}
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: '#333',
                            color: '#fff',
                        },
                    }}
                />
            </div>
        </ErrorBoundary>
    );
}

export default AdminLayout;
