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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Job Application Tracker</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Track semua lamaran kerja kamu</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="bg-gray-200 text-gray-700 px-4 sm:px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm sm:text-base"
            >
              Logout
            </button>
            <button
              onClick={handleAddNew}
              className="bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base w-full sm:w-auto whitespace-nowrap"
            >
              + Tambah Lamaran
            </button>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading...</p>
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
      </div>
    </div>
  );
}
