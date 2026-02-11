import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Lead } from '../types/lead';

interface LeadCardProps {
  lead: Lead;
  onPress: (lead: Lead) => void;
}

const statusColorMap = {
  new: '#64748B',
  contacted: '#2563EB',
  qualified: '#7C3AED',
  proposal: '#EA580C',
  won: '#16A34A',
  lost: '#DC2626',
} as const;

export function LeadCard({ lead, onPress }: LeadCardProps) {
  return (
    <Pressable style={styles.card} onPress={() => onPress(lead)}>
      <View style={styles.headerRow}>
        <Text style={styles.company} numberOfLines={1}>
          {lead.companyName}
        </Text>
        <View style={[styles.statusPill, { backgroundColor: statusColorMap[lead.status] }]}>
          <Text style={styles.statusText}>{lead.status.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.contact}>{lead.contactName} · {lead.title}</Text>
      <View style={styles.bottomRow}>
        <Text style={styles.source}>{lead.source}</Text>
        <Text style={styles.score}>Score: {lead.score}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  company: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    flex: 1,
    marginRight: 8,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 100,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  contact: {
    color: '#334155',
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  source: {
    color: '#475569',
    fontSize: 12,
  },
  score: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '600',
  },
});
