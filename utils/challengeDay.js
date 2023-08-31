export function challengeDay() {
    const oneDayMilliseconds = 24 * 60 * 60 * 1000;
    const start = new Date("2023-09-01");
    const current = new Date();
    const differenceInDays = Math.floor((current - start) / oneDayMilliseconds);
    const challengeDay = differenceInDays + 1;
    return challengeDay;
}