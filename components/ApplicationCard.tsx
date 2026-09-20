import { Application } from '@/lib/types';

interface ApplicationCardProps {
  application: Application;
  onClick: () => void;
}

const statusConfig = {
  Applied: {
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    label: 'Dilamar',
    icon: '📤'
  },
  Screening: {
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    label: 'Screening',
    icon: '📋'
  },
  Interview: {
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    label: 'Interview',
    icon: '💼'
  },
  Offering: {
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    label: 'Penawaran',
    icon: '🎉'
  },
  Rejected: {
    color: 'bg-rose-50 text-rose-700 border-rose-200',
    label: 'Ditolak',
    icon: '❌'
  },
};

export default function ApplicationCard({ application, onClick }: ApplicationCardProps) {
  const formattedDate = new Date(application.applied_date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const config = statusConfig[application.status];

  return (
    <div
      onClick={onClick}
      className="group bg-white/70 backdrop-blur-sm rounded-2xl luxury-shadow hover:luxury-shadow-hover transition-all duration-300 cursor-pointer p-6 lg:p-7 border border-[var(--soft-gold)]/10 hover:border-[var(--soft-gold)]/30 hover:scale-[1.01] active:scale-[0.99]"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg lg:text-xl text-[var(--midnight-navy)] mb-1 truncate group-hover:text-[var(--soft-gold)] transition-colors">
            {application.company}
          </h3>
          <p className="text-[var(--text-secondary)] text-sm lg:text-base font-light tracking-wide truncate">
            {application.role}
          </p>
        </div>
        
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${config.color} whitespace-nowrap flex-shrink-0`}>
          <span>{config.icon}</span>
          <span>{config.label}</span>
        </div>
      </div>

      {/* Platform */}
      {application.platform && (
        <div className="mb-4 flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-[var(--soft-gold)]"></div>
          <p className="text-xs text-[var(--text-muted)] tracking-wide">
            via <span className="text-[var(--text-secondary)] font-medium">{application.platform}</span>
          </p>
        </div>
      )}

      {/* Date */}
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-xs text-[var(--text-secondary)] tracking-wide">{formattedDate}</p>
      </div>

      {/* Notes */}
      {application.notes && (
        <div className="pt-4 border-t border-[var(--soft-gold)]/10">
          <p className="text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
            {application.notes}
          </p>
        </div>
      )}

      {/* Hover indicator */}
      <div className="mt-4 pt-4 border-t border-transparent group-hover:border-[var(--soft-gold)]/10 transition-colors">
        <div className="flex items-center gap-2 text-[var(--soft-gold)] opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs font-medium tracking-wide">Lihat Detail</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
