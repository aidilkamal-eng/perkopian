'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';
import { getErrorMessage } from '../lib/errors';
import AuthLayout from '../components/AuthLayout';
import BeanDivider from '../components/BeanDivider';
import { authInputClass, authLabelClass } from '../lib/styles';

const iconClass =
  'absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-espresso/70 pointer-events-none';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name.trim()) {
      toast.error('Nama lengkap harus diisi');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password minimal 6 karakter');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Konfirmasi password tidak cocok');
      return;
    }
    
    if (!agreeTerms) {
      toast.error('Anda harus menyetujui syarat dan ketentuan');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signup(email, password, name);
      toast.success('Akun berhasil dibuat! Anda akan diarahkan ke halaman utama.');
      
      // Redirect to home after a short delay
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err) {
      const message = getErrorMessage(err);
      if (message.includes('already registered')) {
        toast.error('Email ini sudah terdaftar.');
      } else if (message.includes('Too many requests')) {
        toast.error('Terlalu banyak percobaan. Coba lagi nanti');
      } else {
        toast.error(message || 'Terjadi kesalahan saat mendaftar');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Buat Akun" subtitle="Bergabung dengan komunitas Perkopian">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className={authLabelClass}>Nama Lengkap</label>
          <div className="relative">
            <User className={iconClass} />
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={authInputClass}
              placeholder="Nama Lengkap"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className={authLabelClass}>Email</label>
          <div className="relative">
            <Mail className={iconClass} />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={authInputClass}
              placeholder="nama@email.com"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className={authLabelClass}>Password</label>
          <div className="relative">
            <Lock className={iconClass} />
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={authInputClass}
              placeholder="Minimal 6 karakter"
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className={authLabelClass}>Konfirmasi Password</label>
          <div className="relative">
            <Lock className={iconClass} />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={authInputClass}
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex items-start font-body text-sm text-espresso">
          <input
            id="agree-terms"
            name="agree-terms"
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="h-4 w-4 rounded border-caramel/40 accent-caramel mt-0.5 flex-shrink-0"
            disabled={isLoading}
          />
          <label htmlFor="agree-terms" className="ml-2 cursor-pointer">
            Saya setuju dengan{' '}
            <a href="#" className="text-caramel hover:text-espresso transition-colors">
              Syarat dan Ketentuan
            </a>{' '}
            serta{' '}
            <a href="#" className="text-caramel hover:text-espresso transition-colors">
              Kebijakan Privasi
            </a>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-3 rounded-lg bg-caramel hover:bg-caramel/90 text-white font-body font-medium text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Membuat akun...
            </span>
          ) : (
            <span className="flex items-center">
              <UserPlus className="h-4 w-4 mr-2" />
              Buat Akun
            </span>
          )}
        </button>
      </form>

      <BeanDivider />

      <p className="text-center font-body text-sm text-espresso">
        Sudah punya akun?{' '}
        <Link href="/login" className="text-caramel hover:text-espresso transition-colors">
          Masuk
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignupPage;