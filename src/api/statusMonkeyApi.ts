import { API_BASE_URL, mobileApiRoutes } from '../config/api';
import type { LeadFeedFilter, LeadsResponse } from '../types/lead';

interface FetchLeadsParams {
  query: string;
  filter: LeadFeedFilter;
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`API ${response.status}: ${body || response.statusText}`);
  }

  return (await response.json()) as T;
}

export function fetchDashboardAndLeads({ query, filter }: FetchLeadsParams) {
  const params = new URLSearchParams();
  if (query) {
    params.set('query', query);
  }
  if (filter !== 'all') {
    params.set('filter', filter);
  }

  const path = `${mobileApiRoutes.dashboardAndLeads}${params.toString() ? `?${params.toString()}` : ''}`;
  return requestJson<LeadsResponse>(path);
}

export function markLeadContacted(leadId: string) {
  return requestJson<{ ok: true }>(mobileApiRoutes.markContacted(leadId), {
    method: 'POST',
  });
}

export function markLeadIgnored(leadId: string) {
  return requestJson<{ ok: true }>(mobileApiRoutes.markIgnored(leadId), {
    method: 'POST',
  });
}
