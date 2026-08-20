import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Coffee, Menu, X, Search, MapPin, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import ConfirmDialog from './ConfirmDialog';
import toast from 'react-hot-toast';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
      toast.success('Anda telah keluar.');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleProfileClick = () => {
    setIsUserMenuOpen(false);
    navigate('/profile');
  };

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Coffee className="h-8 w-8 text-amber-600" />
              <span className="ml-2 text-xl font-bold text-amber-800">Perkopian</span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Link to="/cafes" className="text-gray-700 hover:text-amber-600 p-1" title="Cari Warkop">
              <Search className="h-5 w-5" />
            </Link>
            <Link to="/cafes" className="text-gray-700 hover:text-amber-600 p-1" title="Lokasi">
              <MapPin className="h-5 w-5" />
            </Link>
            
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center text-gray-700 hover:text-amber-600 p-1"
                >
                  <img 
                    src={user?.avatar_url || '/disposable-coffee-paper-cup-icon.png'} 
                    alt={user?.name || 'User'} 
                    className="h-8 w-8 rounded-full object-cover border-2 border-gray-200"
                  />
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleProfileClick}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="h-4 w-4 inline mr-2" />
                      Profil
                    </button>
                    <button
                      onClick={() => setShowLogoutDialog(true)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 inline mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-amber-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Masuk
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-amber-600 hover:bg-amber-50 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/cafes" 
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Cari Warkop
            </Link>
            
            {isAuthenticated ? (
              <>
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="flex items-center px-4">
                    <img 
                      src={user?.avatar_url || '/disposable-coffee-paper-cup-icon.png'} 
                      alt={user?.name || 'User'} 
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">{user?.name}</div>
                      <div className="text-sm text-gray-500">{user?.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Link 
                      to="/profile" 
                      className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profil
                    </Link>
                    <button 
                      onClick={() => {
                        setShowLogoutDialog(true);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Masuk
                </Link>
                <Link 
                  to="/signup" 
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Backdrop for user menu */}
      {isUserMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsUserMenuOpen(false)}
        ></div>
      )}

      <ConfirmDialog
        isOpen={showLogoutDialog}
        onCancel={() => setShowLogoutDialog(false)}
        onConfirm={() => {
          setShowLogoutDialog(false);
          handleLogout();
        }}
      />
    </nav>
  );
};

export default Navbar;