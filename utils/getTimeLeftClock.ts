export const getTimeLeftClock = (secondsLeft: number) => {
  if (secondsLeft < 0) {
    return "00:00:00";
  }
  const hours = Math.floor(secondsLeft / 3600)
    .toString()
    .padStart(2, "0");

  const minutes = Math.floor((secondsLeft % 3600) / 60)
    .toString()
    .padStart(2, "0");

  const seconds = Math.floor((secondsLeft % 3600) % 60)
    .toString()
    .padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};
