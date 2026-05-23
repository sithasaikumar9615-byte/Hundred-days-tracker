import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme';
import { ChallengeState } from '../types';
import { dateForChallengeDay, formatISODate } from '../utils/date';
import { tasksForDate } from '../data/tasks';

interface Props {
  state: ChallengeState;
}

export function DayGrid({ state }: Props) {
  if (!state.startDate) return null;
  const cells = Array.from({ length: 100 }, (_, i) => i + 1);
  const today = new Date();

  return (
    <View style={styles.grid}>
      {cells.map((dayNum) => {
        const date = dateForChallengeDay(state.startDate!, dayNum);
        const iso = formatISODate(date);
        const required = tasksForDate(date).length;
        const done = state.progress[iso]?.completedTaskIds.length ?? 0;
        const ratio = required ? done / required : 0;
        const inFuture = date > today;

        let bg = colors.empty;
        if (!inFuture) {
          if (ratio >= 1) bg = colors.success;
          else if (ratio >= 0.66) bg = '#34D399';
          else if (ratio >= 0.33) bg = '#A7F3D0';
          else if (ratio > 0) bg = '#475569';
        }

        return (
          <View key={dayNum} style={[styles.cell, { backgroundColor: bg }]}>
            <Text style={styles.cellText}>{dayNum}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: spacing.md,
  },
  cell: {
    width: 28,
    height: 28,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: '600',
    opacity: 0.7,
  },
});
