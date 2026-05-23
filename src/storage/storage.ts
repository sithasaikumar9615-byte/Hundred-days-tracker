import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChallengeState } from '../types';

const KEY = '@hundred:state:v1';

const initial: ChallengeState = {
  startDate: null,
  progress: {},
};

export async function loadState(): Promise<ChallengeState> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (!raw) return initial;
    return JSON.parse(raw) as ChallengeState;
  } catch {
    return initial;
  }
}

export async function saveState(state: ChallengeState): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(state));
}

export async function resetState(): Promise<void> {
  await AsyncStorage.removeItem(KEY);
}
