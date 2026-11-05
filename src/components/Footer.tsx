import React from 'react';
import Link from 'next/link';
import { Coffee, Instagram, Twitter, Facebook, Github } from 'lucide-react';

const linkClass = 'font-body text-sm text-amber-400 hover:text-white transition-colors';
const headingClass = 'font-heading text-lg text-amber-400 mb-4';

const Footer: React.FC = () => {
  return (
    <footer className="bg-espresso-dark bg-[url('/footer-bg.png')] bg-cover bg-right bg-no-repeat text-cream">
      <div className="max-w-7xl mx-auto pt-14 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center">
              <Coffee className="h-7 w-7 text-amber-300" />
              <span className="ml-2 font-heading text-2xl text-amber-300">Perkopian</span>
            </div>
            <p className="mt-3 font-body text-sm text-cream/70 max-w-[14rem]">
              Temukan warkop terbaik untuk kebutuhanmu.
            </p>
            <div className="mt-5 flex space-x-4">
              <a href="#" aria-label="Instagram" className="text-amber-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5"/>
              </a>
              <a href="#" aria-label="Twitter" className="text-amber-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5 "/>
              </a>
              <a href="#" aria-label="Facebook" className="text-amber-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5"/>
              </a>
              <a href="#" aria-label="Github" className="text-amber-300 hover:text-white transition-colors">
                <Github className="h-5 w-5"/>
              </a>
            </div>
          </div>

          <div>
            <h3 className={headingClass}>Jelajahi</h3>
            <ul className="space-y-2.5">
              <li><Link href="/cafes" className={linkClass}>Cari Warkop</Link></li>
              <li><Link href="/cafes" className={linkClass}>Rating Tertinggi</Link></li>
              <li><Link href="/cafes" className={linkClass}>Lokasi Terdekat</Link></li>
            </ul>
          </div>

          <div>
            <h3 className={headingClass}>Perusahaan</h3>
            <ul className="space-y-2.5">
              <li><Link href="/about" className={linkClass}>Tentang Kami</Link></li>
              <li><a href="#" className={linkClass}>Kontak</a></li>
            </ul>
          </div>

          <div>
            <h3 className={headingClass}>Legal</h3>
            <ul className="space-y-2.5">
              <li><a href="#" className={linkClass}>Privacy Policy</a></li>
              <li><a href="#" className={linkClass}>Terms of Service</a></li>
              <li><a href="#" className={linkClass}>Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="font-body text-xs text-cream/50">
            &copy; {new Date().getFullYear()} Perkopian. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;