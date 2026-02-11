export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost';

export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  title: string;
  email: string;
  phone: string;
  score: number;
  status: LeadStatus;
  source: string;
  notes: string;
  createdAt: string;
}
