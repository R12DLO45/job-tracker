import { Application, ApplicationStatus } from '@/lib/types';

interface FilterTabsProps {
  activeFilter: ApplicationStatus | 'All';
  onFilterChange: (filter: ApplicationStatus | 'All') => void;
  applications: Application[];
}

const filters: (ApplicationStatus | 'All')[] = [
  'All',
  'Applied',
  'Screening',
  'Interview',
  'Offering',
  'Rejected',
];

const filterLabels: Record<ApplicationStatus | 'All', string> = {
  All: 'Semua',
  Applied: 'Dilamar',
  Screening: 'Screening',
  Interview: 'Interview',
  Offering: 'Penawaran',
  Rejected: 'Ditolak',
};

export default function FilterTabs({ activeFilter, onFilterChange, applications }: FilterTabsProps) {
  const getCounts = (filter: ApplicationStatus | 'All') => {
    if (filter === 'All') return applications.length;
    return applications.filter(app => app.status === filter).length;
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {filters.map((filter) => {
        const count = getCounts(filter);
        const isActive = activeFilter === filter;
        
        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`
              relative px-6 py-3.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 tracking-wide
              ${isActive 
                ? 'navy-gradient text-white luxury-shadow-hover scale-[1.02]' 
                : 'bg-white/60 text-[var(--text-secondary)] hover:bg-white/80 border border-[var(--charcoal)]/10 hover:luxury-shadow'
              }
            `}
          >
            <span className="flex items-center gap-2">
              <span>{filterLabels[filter]}</span>
              <span className={`
                px-2 py-0.5 rounded-full text-xs font-semibold
                ${isActive 
                  ? 'bg-white/20 text-white' 
                  : 'bg-[var(--soft-gold)]/10 text-[var(--gold-muted)]'
                }
              `}>
                {count}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
