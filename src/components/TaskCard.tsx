import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Task } from '../types';
import { colors, radius, spacing } from '../theme';

interface Props {
  task: Task;
  done: boolean;
  onToggle: () => void;
}

export function TaskCard({ task, done, onToggle }: Props) {
  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [
        styles.card,
        done && styles.cardDone,
        pressed && { opacity: 0.85 },
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: task.color + '22' }]}>
        <Text style={styles.icon}>{task.icon}</Text>
      </View>
      <View style={styles.body}>
        <Text style={[styles.title, done && styles.titleDone]}>
          {task.title}
        </Text>
        <Text style={styles.meta}>{task.time}</Text>
        <Text style={styles.metaSmall}>{task.duration}</Text>
      </View>
      <View style={[styles.check, done && styles.checkDone]}>
        {done && <Text style={styles.checkMark}>✓</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardDone: {
    borderColor: colors.success,
    backgroundColor: colors.surface,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  icon: { fontSize: 24 },
  body: { flex: 1 },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  meta: {
    color: colors.textMuted,
    fontSize: 13,
  },
  metaSmall: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  check: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkDone: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  checkMark: {
    color: '#fff',
    fontWeight: '700',
  },
});
