import { StatusBar } from 'expo-status-bar';
import { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LeadCard } from './src/components/LeadCard';
import { LeadDetailModal } from './src/components/LeadDetailModal';
import { mockLeads } from './src/data/mockLeads';
import type { Lead, LeadStatus } from './src/types/lead';

const statusFilters: Array<{ label: string; value: LeadStatus | 'all' }> = [
  { label: 'All', value: 'all' },
  { label: 'New', value: 'new' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Qualified', value: 'qualified' },
  { label: 'Proposal', value: 'proposal' },
  { label: 'Won', value: 'won' },
  { label: 'Lost', value: 'lost' },
];

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [activeStatus, setActiveStatus] = useState<LeadStatus | 'all'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const filteredLeads = useMemo(() => {
    return mockLeads.filter((lead) => {
      const matchesSearch =
        lead.companyName.toLowerCase().includes(searchValue.toLowerCase()) ||
        lead.contactName.toLowerCase().includes(searchValue.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchValue.toLowerCase());

      const matchesStatus = activeStatus === 'all' ? true : lead.status === activeStatus;
      return matchesSearch && matchesStatus;
    });
  }, [activeStatus, searchValue]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>StatusMonkey Leads</Text>
        <Text style={styles.subtitle}>Mobile lead finder dashboard</Text>
      </View>

      <View style={styles.searchWrapper}>
        <TextInput
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="Search company, contact, or email"
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
        {statusFilters.map((filter) => {
          const isActive = filter.value === activeStatus;

          return (
            <Text
              key={filter.value}
              onPress={() => setActiveStatus(filter.value)}
              style={[styles.filterChip, isActive ? styles.filterChipActive : styles.filterChipInactive]}
            >
              {filter.label}
            </Text>
          );
        })}
      </ScrollView>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        {filteredLeads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} onPress={setSelectedLead} />
        ))}

        {filteredLeads.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No leads found</Text>
            <Text style={styles.emptySubtitle}>Try adjusting your search or status filter.</Text>
          </View>
        ) : null}
      </ScrollView>

      <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtitle: {
    marginTop: 4,
    color: '#475569',
  },
  searchWrapper: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  filters: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 8,
    overflow: 'hidden',
    fontSize: 13,
    fontWeight: '600',
  },
  filterChipActive: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
  },
  filterChipInactive: {
    backgroundColor: '#E2E8F0',
    color: '#334155',
  },
  list: {
    flex: 1,
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#334155',
  },
  emptySubtitle: {
    color: '#64748B',
    marginTop: 8,
  },
});
