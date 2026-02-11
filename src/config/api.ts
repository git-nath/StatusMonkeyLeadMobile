const defaultBase = 'http://localhost:3000';

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? defaultBase;

export const mobileApiRoutes = {
  dashboardAndLeads: '/api/mobile/leads',
  markContacted: (leadId: string) => `/api/mobile/leads/${leadId}/contacted`,
  markIgnored: (leadId: string) => `/api/mobile/leads/${leadId}/ignored`,
};
