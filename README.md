# Hundred — 100-Day Challenge Tracker

A clean, professional habit tracker for Android & iOS. Built with Expo + React Native + TypeScript.

## Your 100-Day Routine

| Time | Activity | Days |
|------|----------|------|
| 06:00 | Wake up | Daily |
| 07:00 – 08:00 | Yoga | Daily |
| 09:00 – 17:00 | Office work | Mon–Fri |
| Evening | Gym | Daily |
| 30 min | Skill building | Daily |
| 1 hour | Family time | Daily |

## Features

- **Today screen** — daily checklist with progress ring
- **Progress screen** — 100-day grid (heatmap), streaks, completion stats
- **Schedule screen** — visual timeline of your daily routine
- **Smart weekend handling** — office task hides on Sat/Sun automatically
- **Offline-first** — all data stored locally with AsyncStorage
- **Dark theme** — easy on the eyes

## Run It

You need Node.js and (optionally) the Expo Go app on your phone.

```bash
cd hundred-tracker
npm install
npm start
```

Then:
- Scan the QR code with **Expo Go** (iOS App Store / Play Store) — instant preview on your phone
- Press `a` for Android emulator, `i` for iOS simulator, `w` for web

## Build Native Binaries

```bash
# Install EAS CLI once
npm install -g eas-cli
eas login

# Build for both platforms
eas build --platform all
```

This produces an `.aab` for Google Play and an `.ipa` for the App Store.

## Project Structure

```
hundred-tracker/
├── App.tsx                 # Root + tab navigation
├── app.json                # Expo config
└── src/
    ├── types.ts
    ├── theme.ts
    ├── data/tasks.ts       # Daily tasks definition
    ├── storage/storage.ts  # AsyncStorage wrapper
    ├── utils/date.ts       # Day-of-challenge math
    ├── hooks/useChallenge.ts
    ├── components/         # TaskCard, ProgressRing, DayGrid
    └── screens/            # Today, Progress, Schedule
```

## Customize Your Routine

Edit `src/data/tasks.ts` to adjust times, durations, or add new habits. Each task supports a `weekdaysOnly` flag.
