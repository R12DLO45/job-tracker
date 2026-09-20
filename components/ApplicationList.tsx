import { Application } from '@/lib/types';
import ApplicationCard from './ApplicationCard';

interface ApplicationListProps {
  applications: Application[];
  onCardClick: (application: Application) => void;
}

export default function ApplicationList({ applications, onCardClick }: ApplicationListProps) {
  if (!Array.isArray(applications) || applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 lg:py-32">
        <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-[var(--soft-gold)]/10 to-[var(--soft-gold)]/5 flex items-center justify-center mb-6 luxury-shadow">
          <svg className="w-12 h-12 lg:w-16 lg:h-16 text-[var(--soft-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-xl lg:text-2xl font-semibold text-[var(--midnight-navy)] mb-3">Belum Ada Lamaran</h3>
        <p className="text-[var(--text-secondary)] text-sm lg:text-base mb-2 tracking-wide">Mulai perjalanan karir Anda dengan menambahkan lamaran pertama</p>
        <p className="text-[var(--text-muted)] text-xs lg:text-sm tracking-wide">Klik tombol "Tambah Baru" di atas</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          onClick={() => onCardClick(application)}
        />
      ))}
    </div>
  );
}
