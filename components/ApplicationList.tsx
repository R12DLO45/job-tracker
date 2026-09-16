import { Application } from '@/lib/types';
import ApplicationCard from './ApplicationCard';

interface ApplicationListProps {
  applications: Application[];
  onCardClick: (application: Application) => void;
}

export default function ApplicationList({ applications, onCardClick }: ApplicationListProps) {
  if (!Array.isArray(applications) || applications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Belum ada lamaran</p>
        <p className="text-gray-400 text-sm mt-2">Klik tombol "Tambah Lamaran" untuk memulai</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
