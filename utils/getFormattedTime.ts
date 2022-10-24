export const getFormattedTime = (time: number) => ({
  minutes: Math.floor(time / 6000),
  seconds: Math.floor((time / 100) % 60),
  cents: time % 99,
});
