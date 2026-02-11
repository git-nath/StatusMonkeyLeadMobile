import { StyleSheet, Text, View } from 'react-native';

interface StatCardProps {
  label: string;
  value: string;
  tone?: 'normal' | 'hot' | 'emergency' | 'warm';
}

const toneMap = {
  normal: '#00FF66',
  hot: '#FF5A00',
  emergency: '#FF2D2D',
  warm: '#FFC400',
} as const;

export function StatCard({ label, value, tone = 'normal' }: StatCardProps) {
  const color = toneMap[tone];

  return (
    <View style={[styles.card, { borderColor: color }]}>
      <Text style={[styles.label, { color }]}>{label}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    backgroundColor: '#04110B',
    padding: 12,
    minWidth: 140,
    marginRight: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
  value: {
    marginTop: 8,
    fontSize: 30,
    fontWeight: '800',
  },
});
