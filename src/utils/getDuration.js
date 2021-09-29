/**
 * @param {*} number - minutes
 * @returns object {hours: `number`, minutes: `number`}
 */

export function getDuration(number) {
  var tempHours = number / 60;
  var hours = Math.floor(tempHours);
  var tempMinutes = (tempHours - hours) * 60;
  var minutes = Math.round(tempMinutes);

  return { hours, minutes };
}
