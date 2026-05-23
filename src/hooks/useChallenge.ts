import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChallengeState, TaskId } from '../types';
import { loadState, saveState, resetState } from '../storage/storage';
import { dateForChallengeDay, formatISODate, todayISO } from '../utils/date';
import { tasksForDate } from '../data/tasks';

export function useChallenge() {
  const [state, setState] = useState<ChallengeState>({
    startDate: null,
    progress: {},
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadState().then((s) => {
      setState(s);
      setLoaded(true);
    });
  }, []);

  const persist = useCallback((next: ChallengeState) => {
    setState(next);
    saveState(next).catch(() => {});
  }, []);

  const startChallenge = useCallback(() => {
    persist({ startDate: todayISO(), progress: {} });
  }, [persist]);

  const reset = useCallback(async () => {
    await resetState();
    setState({ startDate: null, progress: {} });
  }, []);

  const toggleTask = useCallback(
    (dateISO: string, taskId: TaskId) => {
      const day = state.progress[dateISO] ?? {
        date: dateISO,
        completedTaskIds: [],
      };
      const has = day.completedTaskIds.includes(taskId);
      const next = {
        ...day,
        completedTaskIds: has
          ? day.completedTaskIds.filter((t) => t !== taskId)
          : [...day.completedTaskIds, taskId],
      };
      persist({
        ...state,
        progress: { ...state.progress, [dateISO]: next },
      });
    },
    [state, persist]
  );

  const stats = useMemo(() => {
    if (!state.startDate) {
      return { currentDay: 0, completedDays: 0, streak: 0, totalDone: 0 };
    }
    let completedDays = 0;
    let totalDone = 0;
    for (let i = 1; i <= 100; i++) {
      const d = dateForChallengeDay(state.startDate, i);
      if (d > new Date()) break;
      const iso = formatISODate(d);
      const required = tasksForDate(d).length;
      const done = state.progress[iso]?.completedTaskIds.length ?? 0;
      totalDone += done;
      if (done >= required) completedDays += 1;
    }
    // current streak: walk backwards from today
    let streak = 0;
    for (let i = 0; i < 100; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const iso = formatISODate(d);
      const required = tasksForDate(d).length;
      const done = state.progress[iso]?.completedTaskIds.length ?? 0;
      if (done >= required && required > 0) streak += 1;
      else break;
    }
    const startMs = new Date(state.startDate).getTime();
    const todayMs = new Date().getTime();
    const currentDay = Math.min(
      100,
      Math.floor((todayMs - startMs) / (1000 * 60 * 60 * 24)) + 1
    );
    return { currentDay, completedDays, streak, totalDone };
  }, [state]);

  return {
    state,
    loaded,
    stats,
    startChallenge,
    reset,
    toggleTask,
  };
}
