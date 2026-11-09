'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Home, ArrowRight, Sparkle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-cream bg-[url('/404-bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="relative max-w-3xl mx-auto px-4 py-12 md:py-16 text-center">
        <img
          src="/404-illustration.png"
          alt=""
          className="mx-auto w-64 md:w-80 h-auto mb-6"
        />

        <h1 className="font-heading text-3xl md:text-5xl text-espresso">
          Oops! Halaman Tidak Ditemukan
        </h1>

        <div className="flex items-center justify-center gap-4 my-2">
          <span className="hidden sm:block h-px w-24 bg-gradient-to-r from-transparent to-caramel/50"/>
          <Sparkle className="hidden sm:block h-3 w-3 text-caramel fill-caramel"/>
          <p className="font-heading text-7xl md:text-8xl font-semibold text-espresso leading-none">404</p>
          <Sparkle className="hidden sm:block h-3 w-3 text-caramel fill-caramel"/>
          <span className="hidden sm:block h-px w-24 bg-gradient-to-l from-transparent to-caramel/50"/>
        </div>

        <p className="font-heading text-lg md:text-xl text-espresso/80 max-w-md mx-auto mb-8">
          Sepertinya halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
        </p>

        <Link
          href="/"
          className="inline-flex items-center mt-5 border border-caramel text-caramel hover:bg-caramel hover:text-white font-body font-medium text-sm px-6 py-3 rounded-lg transition-colors"
        >
          <Home className="h-4 w-4 mr-2" />
          Kembali ke Beranda
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;