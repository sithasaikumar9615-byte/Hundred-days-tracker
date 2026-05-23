import { Task } from '../types';
import { colors } from '../theme';

export const TASKS: Task[] = [
  {
    id: 'wake',
    title: 'Wake up',
    time: '06:00',
    duration: 'Start the day',
    icon: '☀️',
    color: colors.warning,
  },
  {
    id: 'yoga',
    title: 'Yoga',
    time: '07:00 – 08:00',
    duration: '1 hour',
    icon: '🧘',
    color: '#8B5CF6',
  },
  {
    id: 'office',
    title: 'Office Work',
    time: '09:00 – 17:00',
    duration: '8 hours · Mon–Fri',
    icon: '💼',
    color: colors.accent,
    weekdaysOnly: true,
  },
  {
    id: 'gym',
    title: 'Gym',
    time: 'Evening',
    duration: 'Workout session',
    icon: '🏋️',
    color: colors.danger,
  },
  {
    id: 'skills',
    title: 'Skill Building',
    time: 'Anytime',
    duration: '30 minutes',
    icon: '📚',
    color: colors.success,
  },
  {
    id: 'family',
    title: 'Family Time',
    time: 'Anytime',
    duration: '1 hour',
    icon: '👨‍👩‍👧',
    color: '#EC4899',
  },
];

export function tasksForDate(date: Date): Task[] {
  const day = date.getDay(); // 0 = Sun, 6 = Sat
  const isWeekend = day === 0 || day === 6;
  return TASKS.filter((t) => !(t.weekdaysOnly && isWeekend));
}
