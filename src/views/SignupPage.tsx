import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Coffee, Mail, Lock, User, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validation
    if (!name.trim()) {
      setError('Nama lengkap harus diisi');
      return;
    }
    
    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Konfirmasi password tidak cocok');
      return;
    }
    
    if (!agreeTerms) {
      setError('Anda harus menyetujui syarat dan ketentuan');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signup(email, password, name);
      console.log('Signup successful');
      
      setSuccess('Akun berhasil dibuat! Anda akan diarahkan ke halaman utama.');
      toast.success('Akun berhasil dibuat! Anda akan diarahkan ke halaman utama.');
      
      // Redirect to home after a short delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (err: unknown) {
      console.error('Signup failed:', err);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-amber-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <Coffee className="h-12 w-12 text-amber-600 mx-auto" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900">Buat Akun</h2>
          <p className="mt-2 text-gray-600">Bergabung dengan Perkopian untuk menemukan warkop terbaik</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm">{success}</span>
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                placeholder="Nama Lengkap"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                placeholder="nama@email.com"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Password minimal 6 karakter
            </p>
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Konfirmasi Password
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="flex items-start">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded mt-1"
              disabled={isLoading}
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
              Saya setuju dengan{' '}
              <a href="#" className="text-amber-600 hover:text-amber-500">
                Syarat dan Ketentuan
              </a>{' '}
              serta{' '}
              <a href="#" className="text-amber-600 hover:text-amber-500">
                Kebijakan Privasi
              </a>
            </label>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-medium text-amber-600 hover:text-amber-500">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;