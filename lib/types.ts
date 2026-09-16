export type ApplicationStatus = 
  | 'Applied' 
  | 'Screening' 
  | 'Interview' 
  | 'Offering' 
  | 'Rejected';

export interface Application {
  id: string;
  company: string;
  role: string;
  platform?: string;
  applied_date: string;
  status: ApplicationStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}
