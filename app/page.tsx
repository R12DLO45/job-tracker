'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';
import { Application, ApplicationStatus } from '@/lib/types';
import ApplicationList from '@/components/ApplicationList';
import ApplicationForm from '@/components/ApplicationForm';
import FilterTabs from '@/components/FilterTabs';
import { User } from '@supabase/supabase-js';

export default function Home() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [activeFilter, setActiveFilter] = useState<ApplicationStatus | 'All'>('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const filteredApplications = activeFilter === 'All' 
    ? applications 
    : applications.filter(app => app.status === activeFilter);

  const fetchApplications = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/applications');
      const data = await res.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      setApplications([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
      fetchApplications();
    };
    checkAuth();
  }, [router, supabase.auth, fetchApplications]);

  const handleSave = async (data: Partial<Application>) => {
    try {
      if (data.id) {
        const res = await fetch('/api/applications', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const updated = await res.json();
        setApplications(prev => prev.map(app => app.id === updated.id ? updated : app));
      } else {
        const res = await fetch('/api/applications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const newApp = await res.json();
        setApplications(prev => [newApp, ...prev]);
      }
      setIsFormOpen(false);
      setSelectedApplication(undefined);
    } catch (error) {
      console.error('Failed to save application:', error);
      alert('Gagal menyimpan data');
    }
  };

  const handleDelete = async () => {
    if (!selectedApplication?.id) return;
    
    if (!confirm('Yakin hapus lamaran ini?')) return;

    try {
      await fetch('/api/applications', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedApplication.id }),
      });
      setApplications(prev => prev.filter(app => app.id !== selectedApplication.id));
      setIsFormOpen(false);
      setSelectedApplication(undefined);
    } catch (error) {
      console.error('Failed to delete application:', error);
      alert('Gagal menghapus data');
    }
  };

  const handleCardClick = (application: Application) => {
    setSelectedApplication(application);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setSelectedApplication(undefined);
    setIsFormOpen(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[var(--soft-gold)] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[var(--text-secondary)] text-sm tracking-wide">Loading...</p>
        </div>
      </div>
    );
  }

  const statusCounts = {
    All: applications.length,
    Applied: applications.filter(a => a.status === 'Applied').length,
    Screening: applications.filter(a => a.status === 'Screening').length,
    Interview: applications.filter(a => a.status === 'Interview').length,
    Offering: applications.filter(a => a.status === 'Offering').length,
    Rejected: applications.filter(a => a.status === 'Rejected').length,
  };

  return (
    <div className="min-h-screen">
      {/* Premium Header */}
      <header className="glass-effect border-b border-[var(--soft-gold)]/10 sticky top-0 z-40 luxury-shadow">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-6 lg:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-8 gold-gradient rounded-full"></div>
                <h1 className="text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-tight text-[var(--midnight-navy)]">
                  Career Tracker
                </h1>
              </div>
              <p className="text-sm lg:text-base text-[var(--text-secondary)] tracking-wide ml-5 font-light">
                Kelola perjalanan karir profesional Anda
              </p>
            </div>
            
            <div className="flex items-center gap-3 lg:gap-4">
              <button
                onClick={handleLogout}
                className="px-5 lg:px-6 py-2.5 lg:py-3 text-sm font-medium text-[var(--text-secondary)] bg-white/60 hover:bg-white/80 rounded-xl border border-[var(--charcoal)]/10 transition-all duration-300 hover:luxury-shadow tracking-wide"
              >
                Logout
              </button>
              <button
                onClick={handleAddNew}
                className="gold-gradient px-6 lg:px-8 py-2.5 lg:py-3 text-sm font-medium text-white rounded-xl luxury-shadow hover:luxury-shadow-hover transition-all duration-300 tracking-wide whitespace-nowrap hover:scale-[1.02] active:scale-[0.98]"
              >
                + Tambah Baru
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-8 lg:py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6 mb-8 lg:mb-12">
          {(Object.entries(statusCounts) as [keyof typeof statusCounts, number][]).map(([key, count]) => (
            <div 
              key={key}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 lg:p-6 border border-[var(--soft-gold)]/10 luxury-shadow hover:luxury-shadow-hover transition-all duration-300 group cursor-pointer"
              onClick={() => setActiveFilter(key as ApplicationStatus | 'All')}
            >
              <p className="text-xs lg:text-sm text-[var(--text-muted)] uppercase tracking-wider mb-2 font-medium">{key}</p>
              <p className="text-2xl lg:text-3xl font-semibold text-[var(--midnight-navy)] group-hover:text-[var(--soft-gold)] transition-colors">{count}</p>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 lg:mb-10">
          <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} applications={applications} />
        </div>

        {/* Applications List */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-2 border-[var(--soft-gold)] border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-[var(--text-secondary)] text-sm tracking-wide">Memuat data...</p>
          </div>
        ) : (
          <ApplicationList
            applications={filteredApplications}
            onCardClick={handleCardClick}
          />
        )}

        {isFormOpen && (
          <ApplicationForm
            application={selectedApplication}
            onClose={() => {
              setIsFormOpen(false);
              setSelectedApplication(undefined);
            }}
            onSave={handleSave}
            onDelete={selectedApplication ? handleDelete : undefined}
          />
        )}
      </main>
    </div>
  );
}
