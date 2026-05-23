import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChallenge } from '../hooks/useChallenge';
import { TaskCard } from '../components/TaskCard';
import { ProgressRing } from '../components/ProgressRing';
import { tasksForDate } from '../data/tasks';
import { prettyDate, todayISO } from '../utils/date';
import { colors, radius, spacing } from '../theme';

export function TodayScreen() {
  const { state, loaded, stats, startChallenge, toggleTask } = useChallenge();

  if (!loaded) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.muted}>Loading…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!state.startDate) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.hero}>Hundred</Text>
          <Text style={styles.subhero}>
            A 100-day challenge to build the life you want.
          </Text>
          <Pressable style={styles.cta} onPress={startChallenge}>
            <Text style={styles.ctaText}>Start Challenge</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const today = new Date();
  const iso = todayISO();
  const tasks = tasksForDate(today);
  const completed = state.progress[iso]?.completedTaskIds ?? [];
  const ratio = tasks.length ? completed.length / tasks.length : 0;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.date}>{prettyDate(today)}</Text>
        <Text style={styles.title}>Day {stats.currentDay} of 100</Text>

        <View style={styles.ringRow}>
          <ProgressRing
            progress={ratio}
            label={`${Math.round(ratio * 100)}%`}
            sublabel="today"
          />
          <View style={styles.statBox}>
            <Stat label="Streak" value={`${stats.streak}🔥`} />
            <Stat label="Days done" value={`${stats.completedDays}`} />
            <Stat label="Tasks" value={`${stats.totalDone}`} />
          </View>
        </View>

        <Text style={styles.section}>Today's Routine</Text>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            done={completed.includes(task.id)}
            onToggle={() => toggleTask(iso, task.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.md, paddingBottom: spacing.xl },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  hero: { color: colors.text, fontSize: 44, fontWeight: '800' },
  subhero: {
    color: colors.textMuted,
    fontSize: 16,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  cta: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.full,
  },
  ctaText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  date: { color: colors.textMuted, fontSize: 14 },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: spacing.lg,
  },
  ringRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  statBox: { flex: 1, marginLeft: spacing.md, gap: spacing.sm },
  stat: {
    backgroundColor: colors.surface,
    padding: spacing.sm,
    borderRadius: radius.sm,
  },
  statValue: { color: colors.text, fontSize: 18, fontWeight: '700' },
  statLabel: { color: colors.textMuted, fontSize: 12 },
  section: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  muted: { color: colors.textMuted },
});
