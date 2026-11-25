'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Settings, Bookmark, Star, LogOut, Mail, MapPin,
  User as UserIcon, ShieldCheck, ChevronRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import ReviewCard from '../components/ReviewCard';
import CafeCard from '../components/CafeCard';
import { useBookmarks } from "../hooks/useBookmarks";
import { useAuth } from '../hooks/useAuth';
import { useUserReviews } from '../hooks/useReviews';
import { getErrorMessage } from '../lib/errors';
import { Review } from '../types';

type Tab = 'reviews' | 'saved' | 'settings';

const fieldClass =
  'w-full rounded-md border border-caramel/30 bg-cream-light px-3 py-2 font-body text-sm text-espresso focus:outline-none focus:border-caramel focus:ring-1 focus:ring-caramel disabled:opacity-60';
const labelClass = 'block font-body text-sm text-espresso mb-1';
const primaryBtn =
  'inline-flex items-center rounded-md border border-caramel/60 bg-espresso px-5 py-2.5 font-body text-sm text-cream transition-colors hover:bg-espresso/90 disabled:opacity-50 disabled:cursor-not-allowed';

const SettingsCard = ({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => (
  <div className="rounded-xl border border-caramel/40 bg-cream-light/60 p-1">
    <div className="rounded-lg border border-caramel/25 p-6">
      <div className="mb-5 flex items-center gap-4">
        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-caramel/50 bg-caramel/15">
          <Icon className="h-6 w-6 text-caramel" />
        </span>
        <div>
          <h3 className="font-heading text-2xl leading-tight text-espresso">{title}</h3>
          <p className="font-heading text-sm italic text-espresso/70">{subtitle}</p>
        </div>
        <span className="hidden h-px flex-1 bg-caramel/30 sm:block" />
      </div>
      {children}
    </div>
  </div>
);

const ProfilePage: React.FC = () => {
  const { user, updateProfile, updatePassword, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('settings');
  const [isUpdating, setIsUpdating] = useState(false);

  // user is guaranteed to exist because of PrivateRoute
  const { reviews: userReviews, loading: reviewsLoading } = useUserReviews(user!.id);
  const { bookmarkedCafes, loading: bookmarksLoading } = useBookmarks(user!.id);
  
  const [formData, setFormData] = useState({
    name: user!.name || '',
    bio: user!.bio || '',
    location: user!.location || '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      await updateProfile({
        name: formData.name,
        bio: formData.bio,
        location: formData.location,
      });
      toast.success('Profil berhasil diperbarui');
    } catch (err) {
      console.error('Profile update error:', err);
      toast.error(getErrorMessage(err) || 'Gagal memperbarui profil');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword.length < 6) {
      toast.error('Password baru minimal 6 karakter');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Konfirmasi password tidak cocok');
      return;
    }

    setIsUpdating(true);

    try {
      await updatePassword(formData.newPassword);
      toast.success('Password berhasil diperbarui');
      setFormData((prev) => ({ ...prev, newPassword: '', confirmPassword: '' }));
    } catch (err) {
      console.error('Password update error:', err);
      toast.error(getErrorMessage(err) || 'Gagal memperbarui password');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
      toast.error('Gagal logout');
    }
  };

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'reviews', label: `Reviews (${userReviews.length})`, icon: Star },
    { id: 'saved', label: 'Warkop Tersimpan', icon: Bookmark },
    { id: 'settings', label: 'Pengaturan', icon: Settings },
  ];
  
  return (
    <div className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile header */}
        <div className="mb-8 rounded-2xl border border-caramel/50 p-1.5">
          <div className="relative overflow-hidden rounded-xl bg-espresso bg-[url('/profile-banner.png')] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/80 to-espresso/30" />
            <div className="relative flex flex-col items-center gap-6 px-6 py-8 text-center md:flex-row md:px-10 md:text-left">
              <img
                src={user!.avatar_url || '/disposable-coffee-paper-cup-icon.png'}
                alt={user!.name || 'User'}
                className="h-28 w-28 flex-shrink-0 rounded-full border-4 border-caramel bg-cream object-cover ring-2 ring-cream/60"
              />
              <div>
                <h1 className="font-heading text-3xl text-cream md:text-4xl">{user!.name || 'User'}</h1>
                <p className="mt-1 font-heading italic text-cream/80">{user!.bio || 'Belum ada bio'}</p>
                <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 font-body text-sm text-cream/90 md:justify-start">
                  <span className="flex items-center">
                    <Mail className="mr-1.5 h-4 w-4" />
                    {user!.email}
                  </span>
                  {user!.location && (
                    <span className="flex items-center">
                      <MapPin className="mr-1.5 h-4 w-4" />
                      {user!.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex overflow-x-auto overflow-y-hidden border-b border-caramel/30">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`-mb-px flex flex-shrink-0 items-center border-b-2 px-6 py-4 font-heading text-base transition-colors ${
                activeTab === id
                  ? 'border-caramel font-semibold text-espresso'
                  : 'border-transparent text-espresso/60 hover:text-espresso'
              }`}
            >
              <Icon className="mr-2 h-5 w-5" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 'reviews' && (
          <UserReviewsSection userReviews={userReviews} reviewsLoading={reviewsLoading} />
        )}

        {activeTab === 'saved' && (
          <div>
            <h2 className="mb-6 font-heading text-2xl text-espresso">Warkop Tersimpan</h2>

            {bookmarksLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse overflow-hidden rounded-xl bg-cream-light shadow-sm">
                    <div className="h-40 bg-cream-dark" />
                    <div className="p-4">
                      <div className="mb-2 h-4 rounded bg-cream-dark" />
                      <div className="h-3 w-2/3 rounded bg-cream-dark" />
                    </div>
                  </div>
                ))}
              </div>
            ) : bookmarkedCafes.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {bookmarkedCafes.map((cafe) => (
                  <CafeCard key={cafe.id} cafe={cafe} />
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Bookmark}
                title="Belum ada warkop tersimpan"
                text="Kamu belum menyimpan warkop apapun."
                action="Jelajahi warkop"
              />
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8">
            <SettingsCard icon={UserIcon} title="Informasi Profil" subtitle="Kelola informasi profil kamu di sini.">
              <form onSubmit={handleProfileUpdate}>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClass}>Nama Lengkap</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={fieldClass}
                      disabled={isUpdating}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={user!.email || ''}
                      disabled
                      className={`${fieldClass} bg-cream-dark/60`}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="bio" className={labelClass}>Bio</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                      className={fieldClass}
                      disabled={isUpdating}
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className={labelClass}>Lokasi</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={fieldClass}
                      disabled={isUpdating}
                    />
                  </div>
                </div>
                <button type="submit" disabled={isUpdating} className={`${primaryBtn} mt-5`}>
                  {isUpdating ? 'Menyimpan...' : 'Simpan Perubahan'}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </form>
            </SettingsCard>

            <SettingsCard icon={ShieldCheck} title="Ubah Password" subtitle="Pastikan akun kamu tetap aman.">
              <form onSubmit={handlePasswordUpdate}>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="newPassword" className={labelClass}>Password Baru</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      autoComplete="new-password"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className={fieldClass}
                      disabled={isUpdating}
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className={labelClass}>Konfirmasi Password Baru</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={fieldClass}
                      disabled={isUpdating}
                    />
                  </div>
                </div>
                <button type="submit" disabled={isUpdating} className={`${primaryBtn} mt-5`}>
                  {isUpdating ? 'Memperbarui...' : 'Perbarui Password'}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </form>
            </SettingsCard>

            <SettingsCard icon={LogOut} title="Akun" subtitle="Kelola akun kamu.">
              <button
                onClick={handleLogout}
                className="inline-flex items-center rounded-md border border-red-300 bg-cream-light px-5 py-2.5 font-body text-sm text-red-600 transition-colors hover:bg-red-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            </SettingsCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

function EmptyState({
  icon: Icon,
  title,
  text,
  action,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
  action: string;
}) {
  return (
    <div className="rounded-xl border border-caramel/40 bg-cream-light/60 p-1">
      <div className="rounded-lg border border-caramel/25 px-6 py-12 text-center">
        <Icon className="mx-auto mb-4 h-12 w-12 text-caramel/50" />
        <h3 className="mb-2 font-heading text-xl text-espresso">{title}</h3>
        <p className="mb-5 font-body text-espresso/70">{text}</p>
        <Link
          href="/cafes"
          className="inline-block rounded-md bg-caramel px-5 py-2.5 font-body text-sm font-medium text-white transition-colors hover:bg-caramel/90"
        >
          {action}
        </Link>
      </div>
    </div>
  );
}

function UserReviewsSection({
  userReviews,
  reviewsLoading,
}: {
  userReviews: Review[];
  reviewsLoading: boolean;
}) {
  return (
    <div>
      <h2 className="mb-6 font-heading text-2xl text-espresso">Review Kamu</h2>

      {reviewsLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="mb-2 h-4 w-1/4 rounded bg-cream-dark" />
              <div className="h-32 rounded-xl bg-cream-dark" />
            </div>
          ))}
        </div>
      ) : userReviews.length > 0 ? (
        <div className="space-y-6">
          {userReviews.map((review) => (
            <div key={review.id}>
              <Link
                href={`/cafes/${review.cafeId}`}
                className="mb-2 inline-block font-heading text-xl text-caramel transition-colors hover:text-espresso"
              >
                {review.cafeName}
              </Link>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Star}
          title="Belum ada review"
          text="Kamu belum menulis review apapun."
          action="Cari warkop untuk direview"
        />
      )}
    </div>
  );
}