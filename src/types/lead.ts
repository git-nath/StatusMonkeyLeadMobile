export type LeadFeedFilter = 'all' | 'today' | 'pinned' | 'top' | 'hot' | 'contacted' | 'replied' | 'converted' | 'ignored';

export interface DashboardStats {
  totalLeads: number;
  emergency: number;
  hot: number;
  warm: number;
  contacted: number;
  dailyGoalCurrent: number;
  dailyGoalTarget: number;
  converted: number;
  revenue: number;
}

export interface Lead {
  id: string;
  title: string;
  subreddit: string;
  author: string;
  commentsCount: number;
  priority: 'emergency' | 'hot' | 'warm' | 'normal';
  postedAt: string;
  postUrl: string;
  contacted: boolean;
  replied: boolean;
  converted: boolean;
  ignored: boolean;
  pinned: boolean;
}

export interface LeadsResponse {
  stats: DashboardStats;
  filterCounts: Record<LeadFeedFilter, number>;
  leads: Lead[];
}
