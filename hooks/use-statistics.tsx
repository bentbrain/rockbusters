import useLocalStorageState from "use-local-storage-state";

type Guesses = {
  "0": number;
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
};

export type Stats = {
  played: number;
  wins: number;
  currentStreak: number;
  maxStreak: number;
  guesses: { [key: string]: number };
};

export function useStatistics() {
  const useStats = useLocalStorageState<Stats>("rockbusters_stats", {
    defaultValue: {
      played: 0,
      wins: 0,
      currentStreak: 0,
      maxStreak: 0,
      guesses: { "0": 0, "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 },
    },
  });

  return useStats;
}
