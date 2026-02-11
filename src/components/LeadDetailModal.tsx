import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { Lead } from '../types/lead';

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export function LeadDetailModal({ lead, onClose }: LeadDetailModalProps) {
  return (
    <Modal visible={Boolean(lead)} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>Lead Details</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeLabel}>Close</Text>
            </Pressable>
          </View>

          {lead ? (
            <ScrollView contentContainerStyle={styles.content}>
              <Field label="Company" value={lead.companyName} />
              <Field label="Contact" value={lead.contactName} />
              <Field label="Title" value={lead.title} />
              <Field label="Email" value={lead.email} />
              <Field label="Phone" value={lead.phone} />
              <Field label="Status" value={lead.status} />
              <Field label="Lead Score" value={String(lead.score)} />
              <Field label="Source" value={lead.source} />
              <Field label="Created" value={lead.createdAt} />
              <Field label="Notes" value={lead.notes} />
            </ScrollView>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '60%',
    maxHeight: '90%',
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  closeButton: {
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  closeLabel: {
    color: '#0F172A',
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 28,
  },
  field: {
    marginTop: 14,
  },
  label: {
    color: '#64748B',
    fontSize: 12,
    marginBottom: 4,
  },
  value: {
    color: '#0F172A',
    fontSize: 16,
  },
});
