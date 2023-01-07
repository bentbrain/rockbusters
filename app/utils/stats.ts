type Stats = {
  played: number;
  wins: number;
  currentStreak: number;
  maxStreak: number;
  guesses: { [key: string]: number };
};

const initialGameData = {
  played: 0,
  wins: 0,
  currentStreak: 0,
  maxStreak: 0,
  guesses: {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
};

export const GetStats = (): Stats => {
  const data = window.localStorage.getItem("rockbusters_stats");
  if (data != null && data != undefined) {
    const gameData = JSON.parse(data);
    return gameData;
  } else {
    window.localStorage.setItem(
      "rockbusters_stats",
      JSON.stringify(initialGameData)
    );
    return initialGameData;
  }
};

export const SetStats = (win: boolean, guess: number) => {
  const gameData = GetStats();
  gameData.played += 1;
  if (win) gameData.wins += 1;
  win ? (gameData.currentStreak += 1) : gameData.currentStreak == 0,
    gameData.currentStreak > gameData.maxStreak &&
      (gameData.maxStreak = gameData.currentStreak);
  gameData.guesses[guess] += 1;
  window.localStorage.setItem("rockbusters_stats", JSON.stringify(gameData));
};
