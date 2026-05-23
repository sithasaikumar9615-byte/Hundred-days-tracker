import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChallenge } from '../hooks/useChallenge';
import { DayGrid } from '../components/DayGrid';
import { colors, radius, spacing } from '../theme';

export function ProgressScreen() {
  const { state, stats, reset } = useChallenge();

  const onReset = () => {
    Alert.alert(
      'Reset challenge?',
      'This will erase all progress. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: () => reset() },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Your Progress</Text>

        <View style={styles.statsRow}>
          <Card label="Day" value={`${stats.currentDay}/100`} />
          <Card label="Completed" value={`${stats.completedDays}`} />
          <Card label="Streak" value={`${stats.streak} 🔥`} />
        </View>

        <Text style={styles.section}>100-Day Map</Text>
        <DayGrid state={state} />

        <View style={styles.legend}>
          <LegendDot color={colors.empty} text="Future" />
          <LegendDot color="#475569" text="Some" />
          <LegendDot color="#A7F3D0" text="33%+" />
          <LegendDot color="#34D399" text="66%+" />
          <LegendDot color={colors.success} text="Done" />
        </View>

        {state.startDate && (
          <Pressable style={styles.reset} onPress={onReset}>
            <Text style={styles.resetText}>Reset Challenge</Text>
          </Pressable>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Card({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardLabel}>{label}</Text>
    </View>
  );
}

function LegendDot({ color, text }: { color: string; text: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.md, paddingBottom: spacing.xl },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
    marginBottom: spacing.lg,
  },
  statsRow: { flexDirection: 'row', gap: spacing.sm },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  cardValue: { color: colors.text, fontSize: 22, fontWeight: '700' },
  cardLabel: { color: colors.textMuted, fontSize: 12, marginTop: 4 },
  section: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginTop: spacing.lg,
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dot: { width: 12, height: 12, borderRadius: radius.sm },
  legendText: { color: colors.textMuted, fontSize: 12 },
  reset: {
    marginTop: spacing.xl,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.danger,
    alignItems: 'center',
  },
  resetText: { color: colors.danger, fontWeight: '600' },
});
