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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-md w-full p-4 sm:p-6 my-8">
        <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-900">
          {application ? 'Edit Lamaran' : 'Tambah Lamaran'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
              placeholder="Contoh: Google"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
              placeholder="Contoh: Frontend Developer"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Platform
            </label>
            <input
              type="text"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
              placeholder="Contoh: LinkedIn, Jobstreet"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ApplicationStatus)}
              className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-base"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-base resize-none"
              placeholder="Catatan tambahan..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-4 py-3 sm:py-2 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors font-medium text-base touch-manipulation"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 sm:py-2 rounded-lg hover:bg-gray-300 active:bg-gray-400 transition-colors font-medium text-base touch-manipulation"
            >
              Batal
            </button>
            {application && onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="w-full sm:w-auto px-4 py-3 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 transition-colors font-medium text-base touch-manipulation"
              >
                Hapus
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
