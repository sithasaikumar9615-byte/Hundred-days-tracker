export type TaskId =
  | 'wake'
  | 'yoga'
  | 'office'
  | 'gym'
  | 'skills'
  | 'family';

export interface Task {
  id: TaskId;
  title: string;
  time: string;
  duration: string;
  icon: string;
  color: string;
  weekdaysOnly?: boolean;
}

export interface DayProgress {
  date: string; // YYYY-MM-DD
  completedTaskIds: TaskId[];
}

export interface ChallengeState {
  startDate: string | null; // YYYY-MM-DD, null until user starts
  progress: Record<string, DayProgress>; // keyed by date
}
