import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Coffee, Search, MapPin, Star, ArrowRight } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import CafeCard from '../components/CafeCard';
import { useCafes } from '../hooks/useCafes';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const navigate = useNavigate();
  const { cafes, loading, error } = useCafes();

  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setSearchLocation(location);
    
    // Navigate to cafes page with search parameters
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location) params.set('location', location);
    
    navigate(`/cafes?${params.toString()}`);
  };

  // Get top rated cafes for the featured section
  const topRatedCafes = [...cafes]
    .sort((a, b) => b.overallRating - a.overallRating)
    .slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-amber-800 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg" 
            alt="Café background" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <Coffee className="h-16 w-16 mx-auto mb-6 text-amber-300" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Temukan warkop terbaikmu untuk nongkrong, wfc, mabar, dll.</h1>
            <p className="text-xl mb-8">Cari warkop dengan Wifi kencang, soket listrik, maupun vibe yang nyaman buat kamu fokus selesaikan tugas.</p>
            
            <div className="mb-8">
              <SearchBar onSearch={handleSearch} />
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link to="/cafes" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm transition-colors">
                Warkop Rating Teratas
              </Link>
              <Link to="/cafes" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm transition-colors">
                Suasana Tenang
              </Link>
              <Link to="/cafes" className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm transition-colors">
                Wifi Kencang
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mengenali Perkopian</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Cari warkop yang tepat untuk nongkrong maupun kerja dalam 3 langkah mudah.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cari & Filter</h3>
              <p className="text-gray-600">Cari warkop berdasarkan lokasi, kualitas WiFi, kesunyian, dan lainnya.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Baca Review</h3>
              <p className="text-gray-600">Lihat review dan rating yang detail dari pengguna lain.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kunjungi & Review</h3>
              <p className="text-gray-600">Kunjungi warkop, nongkrong atau kerjakan tugas, dan bagikan pengalamanmu.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Cafés Section */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Warkop Rating Tertinggi</h2>
            <Link to="/cafes" className="text-amber-600 hover:text-amber-800 flex items-center">
              Lihat Selengkapnya <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">Error loading cafes: {error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topRatedCafes.map(cafe => (
                <CafeCard key={cafe.id} cafe={cafe} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Tahu Warkop yang Bagus?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Bantu komunitas dengan bergabung dan membagikan pengalaman pada warkop favoritmu.</p>
          <Link 
            to="/signup" 
            className="inline-block bg-white text-amber-600 hover:bg-amber-100 px-6 py-3 rounded-lg font-medium text-lg transition-colors"
          >
            Join Perkopian
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;