export const getFormattedTime = (time: number) => ({
  minutes: Math.floor(time / 6000),
  seconds: Math.floor((time / 100) % 60).toLocaleString("en-GB", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  }),
  cents: (time % 99).toLocaleString("en-GB", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  }),
});
