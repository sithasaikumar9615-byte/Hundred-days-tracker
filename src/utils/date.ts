export function formatISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseISODate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function todayISO(): string {
  return formatISODate(new Date());
}

export function dayNumber(startDateISO: string, todayISOStr: string): number {
  const start = parseISODate(startDateISO);
  const today = parseISODate(todayISOStr);
  const ms = today.getTime() - start.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24)) + 1;
}

export function dateForChallengeDay(startDateISO: string, dayNum: number): Date {
  const start = parseISODate(startDateISO);
  const d = new Date(start);
  d.setDate(d.getDate() + (dayNum - 1));
  return d;
}

export function prettyDate(d: Date): string {
  return d.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}
