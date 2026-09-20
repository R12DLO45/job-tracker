'use client';

import { useState, FormEvent } from 'react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Email dan password wajib diisi');
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push('/');
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--soft-gold)]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--soft-gold)]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md">
        {/* Logo / Branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gold-gradient luxury-shadow-lg mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl lg:text-4xl font-semibold text-[var(--midnight-navy)] mb-2 tracking-tight">
            Career Tracker
          </h1>
          <p className="text-[var(--text-secondary)] text-sm lg:text-base tracking-wide font-light">
            Kelola perjalanan karir profesional Anda
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl luxury-shadow-lg p-8 lg:p-10 border border-[var(--soft-gold)]/10">
          <h2 className="text-xl lg:text-2xl font-semibold text-[var(--midnight-navy)] mb-2 tracking-tight">
            Selamat Datang Kembali
          </h2>
          <p className="text-[var(--text-secondary)] text-sm mb-8 tracking-wide">
            Masuk ke akun Anda untuk melanjutkan
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--midnight-navy)] mb-2 tracking-wide">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 bg-white/60 border border-[var(--charcoal)]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--soft-gold)]/50 focus:border-[var(--soft-gold)] text-[var(--midnight-navy)] text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed luxury-shadow-sm"
                placeholder="nama@email.com"
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--midnight-navy)] mb-2 tracking-wide">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-white/60 border border-[var(--charcoal)]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--soft-gold)]/50 focus:border-[var(--soft-gold)] text-[var(--midnight-navy)] text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed luxury-shadow-sm"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3.5 rounded-xl text-sm flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full gold-gradient text-white py-4 rounded-xl font-medium text-base luxury-shadow hover:luxury-shadow-hover transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] tracking-wide"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Masuk...
                </span>
              ) : (
                'Masuk ke Dashboard'
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-[var(--soft-gold)]/10 text-center">
            <p className="text-xs text-[var(--text-muted)] tracking-wide">
              Aplikasi ini menggunakan autentikasi aman dari Supabase
            </p>
          </div>
        </div>

        {/* Bottom tagline */}
        <p className="text-center text-xs text-[var(--text-muted)] mt-8 tracking-wide">
          © 2026 Career Tracker. Dibuat dengan profesionalisme.
        </p>
      </div>
    </div>
  );
}
