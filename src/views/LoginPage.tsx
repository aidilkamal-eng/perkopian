'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Coffee, Mail, Lock, LogIn, Bean } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { getErrorMessage } from '../lib/errors';

const BeanDivider = () => (
  <div className="flex items-center gap-3 my-6">
    <span className="flex-1 hidden sm:block h-px bg-gradient-to-r from-transparent to-caramel/50"/>
    <img src="/bean.png" alt="" className="h-5 w-4 text-caramel" />
    <span className="flex-1 hidden sm:block h-px bg-gradient-to-l from-transparent to-caramel/50"/>
  </div>
);

const inputClass = 
  'block w-full pl-11 pr-3 py-3 rounded-lg border border-caramel/20 bg-cream-light/70 font-body text-sm text-espresso placeholder-gray-400 focus:outline-none focus:border-caramel focus:ring-1 focus:ring-caramel disabled:opacity-60';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasTriedLogin, setHasTriedLogin] = useState(false);
  const { login, user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (user && hasTriedLogin) {
      router.replace('/');
    }
  }, [user, hasTriedLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setHasTriedLogin(true);
    
    try {
      await login(email, password, rememberMe);
      toast.success('Berhasil masuk!');
      setHasTriedLogin(true);
      router.push('/');
    } catch (err) {
      const message = getErrorMessage(err);
      if (message.includes('Invalid login credentials')) {
        toast.error('Email atau password salah.');
      } else if (message.includes('Email not confirmed')) {
        toast.error('Silakan konfirmasi email Anda terlebih dahulu');
      } else if (message.includes('Too many requests')) {
        toast.error('Terlalu banyak percobaan login. Coba lagi nanti');
      } else {
        toast.error(message || 'Terjadi kesalahan saat login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center lg:justify-end lg:pr-[8%] px-4 pt-24 pb-12 bg-cream bg-[url('/login-bg.png')] bg-cover bg-left bg-no-repeat">
      <div className="w-full max-w-[34rem] bg-[url('/login-card.png')] bg-[length:100%_100%] bg-no-repeat px-10  sm:px-16 pt-20 pb-14">
        <div className="text-center">
          <Coffee className="h-12 w-12 text-caramel mx-auto" />
          <h1 className="mt-3 font-heading text-4xl text-espresso">Selamat Datang</h1>
          <p className="mt-1 font-heading italic text-lg text-espresso/80">
            Masuk ke akun Perkopian Anda
          </p>
        </div>

        <BeanDivider />

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block font-body text-sm font-medium text-espresso mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-espresso/70 pointer-events-none" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="nama@email.com"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block font-body text-sm font-medium text-espresso mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-espresso/70 pointer-events-none" />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex items-center justify-between font-body text-sm">
            <label htmlFor="remember-me" className="flex items-center text-espresso cursor-pointer">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-caramel/40 accent-caramel"
                disabled={isLoading}
              />
              <span className="ml-2">Ingat saya</span>
            </label>
            <a href="#" className="text-caramel hover:text-espresso transition-colors">
              Lupa password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 rounded-lg bg-caramel hover:bg-caramel/90 text-white font-body font-medium text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-75" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Masuk...
              </span>
            ) : (
              <span className="flex items-center">
                <LogIn className="h-4 w-4 mr-2" />
                Masuk
              </span>
            )}
          </button>
        </form>

        <BeanDivider />

        <p className="text-center font-body text-sm text-espresso">
            Belum punya akun?{' '}
            <Link href="/signup"  className="text-caramel hover:text-espresso transition-colors">
              Daftar sekarang
            </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;