'use client';

import { Application, ApplicationStatus } from '@/lib/types';
import { useState } from 'react';

interface ApplicationFormProps {
  application?: Application;
  onClose: () => void;
  onSave: (data: Partial<Application>) => void;
  onDelete?: () => void;
}

const statuses: ApplicationStatus[] = ['Applied', 'Screening', 'Interview', 'Offering', 'Rejected'];

const statusLabels: Record<ApplicationStatus, string> = {
  Applied: 'Dilamar',
  Screening: 'Screening',
  Interview: 'Interview',
  Offering: 'Penawaran',
  Rejected: 'Ditolak',
};

export default function ApplicationForm({ application, onClose, onSave, onDelete }: ApplicationFormProps) {
  const [company, setCompany] = useState(application?.company || '');
  const [role, setRole] = useState(application?.role || '');
  const [platform, setPlatform] = useState(application?.platform || '');
  const [status, setStatus] = useState<ApplicationStatus>(application?.status || 'Applied');
  const [notes, setNotes] = useState(application?.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!company.trim() || !role.trim()) {
      alert('Company dan Role wajib diisi');
      return;
    }

    onSave({
      ...(application?.id && { id: application.id }),
      company: company.trim(),
      role: role.trim(),
      platform: platform.trim() || undefined,
      status,
      notes: notes.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-[var(--midnight-navy)]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 z-50 overflow-y-auto">
      <div 
        className="bg-white/95 backdrop-blur-md rounded-3xl max-w-2xl w-full luxury-shadow-lg my-8 animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 sm:px-8 pt-8 pb-6 border-b border-[var(--soft-gold)]/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1 h-8 gold-gradient rounded-full"></div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--midnight-navy)] tracking-tight">
              {application ? 'Edit Lamaran' : 'Tambah Lamaran Baru'}
            </h2>
          </div>
          <p className="text-sm text-[var(--text-secondary)] tracking-wide ml-4">
            {application ? 'Perbarui informasi lamaran kerja Anda' : 'Catat lamaran kerja baru Anda'}
          </p>
          
          <button
            onClick={onClose}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 w-10 h-10 rounded-xl bg-[var(--charcoal)]/5 hover:bg-[var(--charcoal)]/10 transition-colors flex items-center justify-center group"
          >
            <svg className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--midnight-navy)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-8 space-y-6">
          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-[var(--midnight-navy)] mb-2 tracking-wide">
              Perusahaan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-3.5 bg-white/60 border border-[var(--charcoal)]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--soft-gold)]/50 focus:border-[var(--soft-gold)] text-[var(--midnight-navy)] text-base transition-all luxury-shadow-sm"
              placeholder="Contoh: Google Indonesia"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-[var(--midnight-navy)] mb-2 tracking-wide">
              Posisi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3.5 bg-white/60 border border-[var(--charcoal)]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--soft-gold)]/50 focus:border-[var(--soft-gold)] text-[var(--midnight-navy)] text-base transition-all luxury-shadow-sm"
              placeholder="Contoh: Senior Frontend Developer"
              required
            />
          </div>

          {/* Platform */}
          <div>
            <label className="block text-sm font-medium text-[var(--midnight-navy)] mb-2 tracking-wide">
              Platform
            </label>
            <input
              type="text"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full px-4 py-3.5 bg-white/60 border border-[var(--charcoal)]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--soft-gold)]/50 focus:border-[var(--soft-gold)] text-[var(--midnight-navy)] text-base transition-all luxury-shadow-sm"
              placeholder="Contoh: LinkedIn, Jobstreet, Glints"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-[var(--midnight-navy)] mb-2 tracking-wide">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
              className="w-full px-4 py-3.5 bg-white/60 border border-[var(--charcoal)]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--soft-gold)]/50 focus:border-[var(--soft-gold)] text-[var(--midnight-navy)] text-base transition-all luxury-shadow-sm appearance-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23475569'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.25rem'
              }}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {statusLabels[s]}
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-[var(--midnight-navy)] mb-2 tracking-wide">
              Catatan
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-4 py-3.5 bg-white/60 border border-[var(--charcoal)]/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--soft-gold)]/50 focus:border-[var(--soft-gold)] text-[var(--midnight-navy)] text-base transition-all resize-none luxury-shadow-sm"
              placeholder="Tambahkan catatan, kontak recruiter, atau informasi penting lainnya..."
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 gold-gradient text-white px-6 py-4 rounded-xl font-medium text-base luxury-shadow hover:luxury-shadow-hover transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] tracking-wide"
            >
              {application ? 'Perbarui Lamaran' : 'Simpan Lamaran'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none bg-white/60 text-[var(--text-secondary)] px-6 py-4 rounded-xl border border-[var(--charcoal)]/10 hover:bg-white/80 transition-all duration-300 font-medium text-base tracking-wide"
            >
              Batal
            </button>
            {application && onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="w-full sm:w-auto px-6 py-4 bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 transition-all duration-300 font-medium text-base tracking-wide"
              >
                Hapus Lamaran
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
