'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Wifi, Users, Heart, ArrowRight } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FeaturedCafeCard from '../components/FeaturedCafeCard';
import { useCafes } from '../hooks/useCafes';

const HomePage: React.FC = () => {
  const router = useRouter();
  const { cafes, loading, error } = useCafes();

  const heroChips = ['Warkop Rating Teratas', 'Suasana Tenang', 'Wifi Kencang'];
  const features = [
    { icon: Search, title: 'Mudah Dicari', desc: 'Temukan warkop terbaik di lokasimu dengan cepat.' },
    { icon: Wifi, title: 'Info Lengkap', desc: 'Lihat fasilitas, suasana, harga, dan ulasan pengguna.' },
    { icon: Users, title: 'Komunitas Aktif', desc: 'Bergabung dengan sesama remote worker, berbagi tips, dan temukan teman baru.' },
    { icon: Heart, title: 'Dukung Lokal', desc: 'Bantu warkop favorit di sekitarmu untuk terus tumbuh.' },
  ];

  const handleSearch = (query: string, location: string) => { 
    // Navigate to cafes page with search parameters
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (location) params.set('location', location);
    
    router.push(`/cafes?${params.toString()}`);
  };

  // Get top rated cafes for the featured section
  const topRatedCafes = [...cafes]
    .sort((a, b) => b.overallRating - a.overallRating)
    .slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center pt-16 text-white">
        <div className="absolute inset-0">
          <img 
            src="/hero-cafe-background.png" 
            alt="Café background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/50 to-transparent"/>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Left-aligned text block */}
          <div className="max-w-2xl lg:pl-12">
            <p className="text-xs tracking-[0.3em] uppercase font-sub-heading text-amber-400 mb-4">Temukan</p>

            <h1 className="font-heading text-5xl md:text-6xl leading-tight mb-6">
              Warkop yang Pas untuk Kerja, Ngopi, dan Berkarya
            </h1>

            <p className="font-body text-base md:text-lg text-white/90 max-w-xl leading-relaxed">
              Cari warkop ramah kerja (WFC) di sekitarmu, lengkap dengan ulasan, fasilitas, dan suasana yang cocok untuk produktivitas.
            </p>
          </div>

          {/* Centered search + chips */}
          <div className="mt-10 flex flex-col items-center">
            <SearchBar onSearch={handleSearch} variant="hero"/>

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {heroChips.map((chip) => (
                <Link
                  key={chip}
                  href="/cafes"
                  className="border border-white/40 rounded-full px-4 py-1.5 text-xs font-body hover:bg-white/10 transition-colors"
                >
                  {chip}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Perkopian Section */}
      <section className="py-20 bg-cream-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase font-sub-heading text-amber-900 mb-3">
              Kenapa Perkopian?
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-espresso mb-4">
              Lebih dari Sekadar Daftar Warkop
            </h2>
            <p className="font-body text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
              Perkopian hadir untuk membantu kamu menemukan tempat kerja yang nyaman, sekaligus menjadi bagian dari komunitas pekerja jarak jauh di sekitarmu.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-y-10 lg:gap-y-0 lg:divide-x lg:divide-caramel/15">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center px-6">
                <div className="bg-cream-dark w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Icon className="h-7 w-7 text-amber-700"/>
                </div>
                <h3 className="font-heading text-xl text-gray-800 mb-2">{title}</h3>
                <p className="font-body text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Cafés Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase font-sub-heading text-amber-900 mb-3">
                Warkop Pilihan
              </p>
              <h2 className="font-heading text-3xl md:text-4xl text-espresso">
                Tempat Favorit untuk Bekerja
              </h2>
            </div>
            <Link href="/cafes" className="font-body text-sm text-caramel hover:text-espresso flex items-center transition-colors">
              Lihat Semua <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-cream-light rounded-xl shadow-sm overflow-hidden animate-pulse">
                  <div className="h-40 bg-cream-dark"></div>
                  <div className="p-4">
                    <div className="h-4 bg-cream-dark rounded mb-2"></div>
                    <div className="h-3 bg-cream-dark rounded mb-2"></div>
                    <div className="h-3 bg-cream-dark rounded mb-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">Error loading cafes: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-caramel hover:bg-caramel/90 text-white px-4 py-2 rounded-md"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topRatedCafes.map((cafe, index) => (
                <FeaturedCafeCard
                  key={cafe.id}
                  cafe={cafe}
                  badge={index === 0 ? 'Rekomendasi' : undefined}
                />
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
            href="/signup" 
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