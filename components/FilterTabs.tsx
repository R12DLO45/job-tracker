import { ApplicationStatus } from '@/lib/types';

interface FilterTabsProps {
  activeFilter: ApplicationStatus | 'All';
  onFilterChange: (filter: ApplicationStatus | 'All') => void;
}

const filters: (ApplicationStatus | 'All')[] = [
  'All',
  'Applied',
  'Screening',
  'Interview',
  'Offering',
  'Rejected',
];

export default function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors touch-manipulation ${
            activeFilter === filter
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
