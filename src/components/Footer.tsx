import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Instagram, Twitter, Facebook, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-amber-800 text-amber-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Coffee className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">Perkopian</span>
            </div>
            <p className="mt-2 text-sm">
              Temukan warkop terbaik untuk kebutuhanmu.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-amber-200 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-amber-200 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-amber-200 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-amber-200 hover:text-white">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Explore</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/cafes" className="text-amber-200 hover:text-white">
                  Cari Warkop
                </Link>
              </li>
              <li>
                <Link to="/cafes" className="text-amber-200 hover:text-white">
                  Rating Tertinggi
                </Link>
              </li>
              <li>
                <Link to="/cafes" className="text-amber-200 hover:text-white">
                  Lokasi terdekat
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-amber-200 hover:text-white">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <a href="#" className="text-amber-200 hover:text-white">
                  Kontak
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-amber-200 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-amber-200 hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-amber-200 hover:text-white">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-amber-700 pt-8 md:flex md:items-center md:justify-between">
          <p className="text-sm text-amber-300">
            &copy; {new Date().getFullYear()} Perkopian. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;