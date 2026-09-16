import { Application } from '@/lib/types';

interface ApplicationCardProps {
  application: Application;
  onClick: () => void;
}

const statusColors = {
  Applied: 'bg-blue-100 text-blue-800',
  Screening: 'bg-yellow-100 text-yellow-800',
  Interview: 'bg-purple-100 text-purple-800',
  Offering: 'bg-green-100 text-green-800',
  Rejected: 'bg-red-100 text-red-800',
};

export default function ApplicationCard({ application, onClick }: ApplicationCardProps) {
  const formattedDate = new Date(application.applied_date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow hover:shadow-md active:shadow-lg transition-shadow cursor-pointer p-4 sm:p-5 border border-gray-200 touch-manipulation"
    >
      <div className="flex justify-between items-start gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base sm:text-lg text-gray-900 truncate">{application.company}</h3>
          <p className="text-gray-600 text-sm sm:text-base truncate">{application.role}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${statusColors[application.status]}`}>
          {application.status}
        </span>
      </div>
      
      {application.platform && (
        <p className="text-xs text-gray-500 mb-2">via {application.platform}</p>
      )}
      
      <p className="text-xs text-gray-400">{formattedDate}</p>
      
      {application.notes && (
        <p className="text-sm text-gray-600 mt-2 line-clamp-2 break-words">{application.notes}</p>
      )}
    </div>
  );
}
