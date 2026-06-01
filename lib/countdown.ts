export interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export function getTimeLeft(serverTime: string): TimeLeft {
  const now = new Date();
  const resetDate = new Date(serverTime);
  resetDate.setUTCHours(24, 0, 0, 0); // Set to midnight UTC
  if (
    now.getUTCHours() === 0 &&
    now.getUTCMinutes() === 0 &&
    now.getUTCSeconds() === 0
  ) {
    resetDate.setDate(resetDate.getDate() + 1); // Move to the next day if it's exactly midnight
  }
  const timeLeft = resetDate.getTime() - now.getTime();

  return {
    hours: Math.max(Math.floor((timeLeft / (1000 * 60 * 60)) % 24), 0),
    minutes: Math.max(Math.floor((timeLeft / (1000 * 60)) % 60), 0),
    seconds: Math.max(Math.floor((timeLeft / 1000) % 60), 0),
  };
}
