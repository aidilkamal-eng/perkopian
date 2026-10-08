import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, Bookmark, Star, LogOut, 
  Mail, MapPin, AlertCircle, CheckCircle 
} from 'lucide-react';
import ReviewCard from '../components/ReviewCard';
import CafeCard from '../components/CafeCard';
import { useBookmarks } from "../hooks/useBookmarks";
import { useAuth } from '../hooks/useAuth';
import { useUserReviews } from '../hooks/useReviews';


const ProfilePage: React.FC = () => {
  const { user, updateProfile, updatePassword, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'reviews' | 'saved' | 'settings'>('settings');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Now user is guaranteed to exist due to PrivateRoute
  const { reviews: userReviews, loading: reviewsLoading } = useUserReviews(user!.id);
  const { bookmarkedCafes, loading: bookmarksLoading } = useBookmarks(user!.id);
  
  // Form states
  const [formData, setFormData] = useState({
    name: user!.name || '',
    bio: user!.bio || '',
    location: user!.location || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsUpdating(true);

    try {
      await updateProfile({
        name: formData.name,
        bio: formData.bio,
        location: formData.location,
      });
      setSuccessMessage('Profil berhasil diperbarui');
    } catch (err: any) {
      console.error('Profile update error:', err);
      setError(err.message || 'Gagal memperbarui profil');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (formData.newPassword.length < 6) {
      setError('Password baru minimal 6 karakter');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Konfirmasi password tidak cocok');
      return;
    }

    setIsUpdating(true);

    try {
      await updatePassword(formData.newPassword);
      setSuccessMessage('Password berhasil diperbarui');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (err: any) {
      console.error('Password update error:', err);
      setError(err.message || 'Gagal memperbarui password');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err: any) {
      console.error('Logout error:', err);
      setError('Gagal logout');
    }
  };

  // Update form data when user data changes
  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        bio: user.bio || '',
        location: user.location || '',
      }));
    }
  }, [user]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-amber-600 h-32"></div>
        <div className="px-6 py-4 flex flex-col md:flex-row md:items-end -mt-16">
          <div className="flex-shrink-0">
            <img 
              src={user!.avatar_url || '/disposable-coffee-paper-cup-icon.png'} 
              alt={user!.name || 'User'} 
              className="h-32 w-32 rounded-full border-4 border-white object-cover"
            />
          </div>
          <div className="mt-6 md:mt-0 md:ml-6 md:pb-4">
            <h1 className="text-2xl font-bold text-gray-900">{user!.name || 'User'}</h1>
            <p className="text-gray-600">{user!.bio || 'Belum ada bio'}</p>
            <div className="mt-2 flex flex-wrap gap-4">
              <div className="flex items-center text-gray-500">
                <Mail className="h-4 w-4 mr-1" />
                <span>{user!.email}</span>
              </div>
              {user!.location && (
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{user!.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'reviews'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('reviews')}
            >
              <Star className="h-5 w-5 inline mr-2" />
              Reviews ({userReviews.length})
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'saved'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('saved')}
            >
              <Bookmark className="h-5 w-5 inline mr-2" />
              Warkop Tersimpan
            </button>
            <button
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('settings')}
            >
              <Settings className="h-5 w-5 inline mr-2" />
              Pengaturan
            </button>
          </nav>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          {activeTab === 'reviews' && (
            <UserReviewsSection userReviews={userReviews} reviewsLoading={reviewsLoading} />
          )}
          
          {activeTab === 'saved' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Warkop Tersimpan</h2>

              {bookmarksLoading ? (
                <div>Loading...</div>
              ) : bookmarkedCafes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {bookmarkedCafes.map((cafe) => (
                    <CafeCard key={cafe.id} cafe={cafe} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Bookmark className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada warkop tersimpan</h3>
                  <p className="text-gray-500 mb-4">Kamu belum menyimpan warkop apapun.</p>
                  <Link 
                    to="/cafes" 
                    className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md"
                  >
                    Jelajahi warkop
                  </Link>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Pengaturan Akun</h2>
              
              {successMessage && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  {successMessage}
                </div>
              )}

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  {error}
                </div>
              )}

              <div className="space-y-6">
                {/* Profile Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Informasi Profil</h3>
                  <form onSubmit={handleProfileUpdate} className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                          disabled={isUpdating}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={user!.email || ''}
                          disabled
                          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          name="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                          rows={3}
                          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                          disabled={isUpdating}
                        />
                      </div>
                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Lokasi
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                          disabled={isUpdating}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <button 
                        type="submit"
                        disabled={isUpdating}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isUpdating ? 'Menyimpan...' : 'Simpan Perubahan'}
                      </button>
                    </div>
                  </form>
                </div>
                
                {/* Password */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Ubah Password</h3>
                  <form onSubmit={handlePasswordUpdate} className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Password Baru
                        </label>
                        <input
                          type="password"
                          id="newPassword"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                          disabled={isUpdating}
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Konfirmasi Password Baru
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                          disabled={isUpdating}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <button 
                        type="submit"
                        disabled={isUpdating}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isUpdating ? 'Memperbarui...' : 'Perbarui Password'}
                      </button>
                    </div>
                  </form>
                </div>
                
                {/* Account Actions */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Akun</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="space-y-4">
                      <button 
                        onClick={handleLogout}
                        className="flex items-center text-red-600 hover:text-red-800"
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

function UserReviewsSection({
  userReviews,
  reviewsLoading,
}: {
  userReviews: any[],
  reviewsLoading: boolean
}) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Review Kamu</h2>

      {reviewsLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : userReviews.length > 0 ? (
        <div className="space-y-6">
          {userReviews.map(review => (
            <div key={review.id}>
              <div className="mb-2">
                <Link to={`/cafes/${review.cafeId}`} className="text-lg font-medium text-amber-600 hover:text-amber-800">
                  {review.cafeName}
                </Link>
              </div>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada review</h3>
          <p className="text-gray-500 mb-4">Kamu belum menulis review apapun.</p>
          <Link 
            to="/cafes" 
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md"
          >
            Cari warkop untuk direview
          </Link>
        </div>
      )}
    </div>
  );
}