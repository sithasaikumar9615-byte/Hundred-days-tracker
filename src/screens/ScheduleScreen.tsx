import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TASKS } from '../data/tasks';
import { colors, radius, spacing } from '../theme';

export function ScheduleScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Daily Schedule</Text>
        <Text style={styles.subtitle}>
          Your blueprint for 100 days. Office work runs Monday to Friday;
          weekends keep the rest.
        </Text>

        <View style={styles.timeline}>
          {TASKS.map((task, idx) => (
            <View key={task.id} style={styles.row}>
              <View style={styles.timeCol}>
                <Text style={styles.time}>{task.time}</Text>
              </View>
              <View style={styles.lineCol}>
                <View
                  style={[styles.dot, { backgroundColor: task.color }]}
                />
                {idx < TASKS.length - 1 && <View style={styles.line} />}
              </View>
              <View style={styles.bodyCol}>
                <Text style={styles.icon}>{task.icon}</Text>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <Text style={styles.taskMeta}>{task.duration}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: spacing.md, paddingBottom: spacing.xl },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  timeline: { marginTop: spacing.sm },
  row: { flexDirection: 'row', minHeight: 90 },
  timeCol: { width: 90, paddingTop: 4 },
  time: { color: colors.textMuted, fontSize: 12, fontWeight: '600' },
  lineCol: { width: 24, alignItems: 'center' },
  dot: { width: 14, height: 14, borderRadius: radius.full, marginTop: 6 },
  line: { flex: 1, width: 2, backgroundColor: colors.border, marginTop: 4 },
  bodyCol: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  icon: { fontSize: 22, marginBottom: 4 },
  taskTitle: { color: colors.text, fontSize: 16, fontWeight: '600' },
  taskMeta: { color: colors.textMuted, fontSize: 13, marginTop: 2 },
});
