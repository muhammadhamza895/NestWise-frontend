import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  List,
  PlusSquare,
  Calendar,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  LogIn,
  Database
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, isLoggedIn, user } = useAuth()

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout()
    // localStorage.removeItem('token');
    // localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/list', label: 'Properties', icon: List },
    { path: '/admin/add', label: 'Add Property', icon: PlusSquare },
    { path: '/admin/appointments', label: 'Appointments', icon: Calendar },
  ];

  return (
    <header className="sticky top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Home className="h-5 w-5 text-blue-600" />
            </div>
            <span className="ml-2 text-xl font-bold text-gray-900">NestWise</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md shrink-0  text-sm font-medium transition-colors ${isActive(item.path)
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <div className="flex items-center">
                  <item.icon className="h-4 w-4 mr-1.5" />
                  {item.label}
                </div>
              </Link>
            ))}

            {(isLoggedIn && user?.isAdmin) ? (
              <>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md shrink-0 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors ml-2"
                >
                  <div className="flex items-center">
                    <LogOut className="h-4 w-4 mr-1.5" />
                    Logout
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/admin/login'
                  className="px-3 py-2 rounded-md shrink-0 text-sm font-medium text-green-600 hover:bg-red-50 transition-colors ml-2"
                >
                  <div className="flex items-center">
                    <LogIn className="h-5 w-5 mr-2" />
                    Login
                  </div>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-gray-100 shadow-lg"
        >
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md shrink-0  text-base font-medium ${isActive(item.path)
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center">
                  <item.icon className="h-5 w-5 mr-2" />
                  {item.label}
                </div>
              </Link>
            ))}

            {(isLoggedIn && user?.isAdmin) ? (
              <>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md shrink-0  text-base font-medium text-red-600 hover:bg-red-50"
                >
                  <div className="flex items-center">
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/admin/login'
                  className="w-full text-left px-3 py-2 rounded-md shrink-0   text-base font-medium text-green-600 hover:bg-red-50"
                >
                  <div className="flex items-center">
                    <LogIn className="h-5 w-5 mr-2" />
                    Login
                  </div>
                </Link>
              </>
            )}

          </div>
        </motion.div>
      )}
    </header>
  );
};

export default AdminNavbar;