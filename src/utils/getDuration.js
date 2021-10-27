/**
 * @param {number} number - in minutes
 * @returns {{hours: number, minutes: number, combinedText: string}}
 */

export function getDuration(number) {
  const tempHours = number / 60;
  const hours = Math.floor(tempHours);
  const tempMinutes = (tempHours - hours) * 60;
  const minutes = Math.round(tempMinutes);

  const getSCharacter = (x) => (!(x <= 1) ? "s" : "");

  const combinedText = `${
    hours ? `${hours} hour${getSCharacter(hours)} ` : ""
  } ${minutes ? `${minutes} minute${getSCharacter(minutes)}` : ""}`;

  return { hours, minutes, combinedText };
}
