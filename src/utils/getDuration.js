/**
 * @param {number} number - in minutes
 * @returns {{hours: number, minutes: number, combinedText: string}}
 */

export function getDuration(number) {
  const tempHours = number / 60;
  const hours = Math.floor(tempHours);
  const tempMinutes = (tempHours - hours) * 60;
  const minutes = Math.round(tempMinutes);

  const combinedText = `${hours ? `${hours} hours ` : null} ${
    minutes ? `${minutes} minutes.` : null
  }}`;

  return { hours, minutes, combinedText };
}
