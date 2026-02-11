import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Lead } from '../types/lead';

interface LeadCardProps {
  lead: Lead;
  onMarkContacted: (leadId: string) => void;
  onMarkIgnored: (leadId: string) => void;
}

const priorityBorder = {
  emergency: '#FF2D2D',
  hot: '#FF5A00',
  warm: '#FFC400',
  normal: '#00F5FF',
} as const;

export function LeadCard({ lead, onMarkContacted, onMarkIgnored }: LeadCardProps) {
  return (
    <View style={[styles.card, { borderColor: priorityBorder[lead.priority] }]}>
      <Text style={styles.title} numberOfLines={2}>
        {lead.title}
      </Text>
      <Text style={styles.meta}>
        r/{lead.subreddit} · u/{lead.author} · {lead.commentsCount} comments
      </Text>

      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={() => Linking.openURL(lead.postUrl)}>
          <Text style={styles.actionText}>Open Post</Text>
        </Pressable>

        <Pressable style={[styles.actionButton, styles.actionPositive]} onPress={() => onMarkContacted(lead.id)}>
          <Text style={styles.actionText}>Contacted</Text>
        </Pressable>

        <Pressable style={[styles.actionButton, styles.actionDanger]} onPress={() => onMarkIgnored(lead.id)}>
          <Text style={styles.actionText}>Ignore</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    backgroundColor: '#04110B',
    marginBottom: 10,
    padding: 12,
  },
  title: {
    color: '#33FF66',
    fontWeight: '700',
    fontSize: 14,
  },
  meta: {
    color: '#9FFFC0',
    marginTop: 6,
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    borderColor: '#00FF66',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#001B0E',
  },
  actionPositive: {
    borderColor: '#00F5FF',
  },
  actionDanger: {
    borderColor: '#FF2D2D',
  },
  actionText: {
    color: '#00FF66',
    fontSize: 11,
    fontWeight: '700',
  },
});
