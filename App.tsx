import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { fetchDashboardAndLeads, markLeadContacted, markLeadIgnored } from './src/api/statusMonkeyApi';
import { LeadCard } from './src/components/LeadCard';
import { StatCard } from './src/components/StatCard';
import { API_BASE_URL } from './src/config/api';
import type { LeadFeedFilter, LeadsResponse } from './src/types/lead';

const feedFilters: Array<{ key: LeadFeedFilter; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'today', label: 'Today' },
  { key: 'pinned', label: 'Pinned' },
  { key: 'top', label: 'Top 10' },
  { key: 'hot', label: 'Hot' },
  { key: 'contacted', label: 'Contacted' },
  { key: 'replied', label: 'Replied' },
  { key: 'converted', label: 'Converted' },
  { key: 'ignored', label: 'Ignored' },
];

export default function App() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<LeadFeedFilter>('all');
  const [payload, setPayload] = useState<LeadsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const next = await fetchDashboardAndLeads({ query, filter });
      setPayload(next);
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : 'Unknown request error';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [filter, query]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onMarkContacted = async (leadId: string) => {
    try {
      await markLeadContacted(leadId);
      await loadData();
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : 'Failed to mark lead contacted';
      setError(message);
    }
  };

  const onMarkIgnored = async (leadId: string) => {
    try {
      await markLeadIgnored(leadId);
      await loadData();
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : 'Failed to ignore lead';
      setError(message);
    }
  };

  const stats = payload?.stats;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.brand}>⚡ STATUSMONKEY LEAD FINDER</Text>
        <Text style={styles.apiLine}>Connected to backend: {API_BASE_URL}</Text>

        <View style={styles.searchRow}>
          <TextInput
            style={styles.search}
            placeholder="Search leads by keyword, subreddit, or author"
            placeholderTextColor="#1EA35A"
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={loadData}
          />
          <Pressable style={styles.refreshBtn} onPress={loadData}>
            <Text style={styles.refreshText}>Refresh</Text>
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsRow}>
          <StatCard label="Total Leads" value={String(stats?.totalLeads ?? 0)} />
          <StatCard label="Emergency" value={String(stats?.emergency ?? 0)} tone="emergency" />
          <StatCard label="Hot" value={String(stats?.hot ?? 0)} tone="hot" />
          <StatCard label="Warm" value={String(stats?.warm ?? 0)} tone="warm" />
          <StatCard label="Contacted" value={String(stats?.contacted ?? 0)} />
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {feedFilters.map((item) => {
            const selected = item.key === filter;
            const count = payload?.filterCounts[item.key] ?? 0;

            return (
              <Pressable
                key={item.key}
                onPress={() => setFilter(item.key)}
                style={[styles.filterChip, selected ? styles.filterChipSelected : undefined]}
              >
                <Text style={styles.filterLabel}>{item.label}</Text>
                <Text style={styles.filterCount}>{count}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {isLoading ? (
          <ActivityIndicator color="#00FF66" style={styles.loader} />
        ) : (
          <View style={styles.leadsList}>
            {payload?.leads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} onMarkContacted={onMarkContacted} onMarkIgnored={onMarkIgnored} />
            ))}

            {payload && payload.leads.length === 0 ? (
              <Text style={styles.empty}>No leads returned by backend for this filter.</Text>
            ) : null}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010A14',
  },
  content: {
    padding: 12,
    paddingBottom: 24,
  },
  brand: {
    color: '#00FF66',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
  },
  apiLine: {
    color: '#00F5FF',
    fontSize: 11,
    marginBottom: 12,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  search: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#00FF66',
    color: '#00FF66',
    backgroundColor: '#03120D',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 12,
  },
  refreshBtn: {
    borderWidth: 1,
    borderColor: '#00F5FF',
    backgroundColor: '#00172A',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  refreshText: {
    color: '#00F5FF',
    fontWeight: '700',
    fontSize: 12,
  },
  statsRow: {
    paddingBottom: 10,
  },
  filterRow: {
    paddingBottom: 10,
  },
  filterChip: {
    borderWidth: 1,
    borderColor: '#00FF66',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#03120D',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  filterChipSelected: {
    backgroundColor: '#0A2C12',
    borderColor: '#CCFF00',
  },
  filterLabel: {
    color: '#00FF66',
    fontSize: 12,
    fontWeight: '700',
  },
  filterCount: {
    color: '#CCFF00',
    fontSize: 12,
    fontWeight: '700',
  },
  errorText: {
    borderWidth: 1,
    borderColor: '#FF2D2D',
    color: '#FF6B6B',
    backgroundColor: '#1C0202',
    padding: 10,
    marginBottom: 10,
  },
  loader: {
    marginTop: 24,
  },
  leadsList: {
    marginTop: 4,
  },
  empty: {
    color: '#00FF66',
    textAlign: 'center',
    marginTop: 24,
  },
});
