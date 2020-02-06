// these seem like a reasonable averages (https://en.wikipedia.org/wiki/Solar_panel#Efficiencies)
const wattsPerSquareMeter = 250;
const efficiency = .2;
/**
 * Given an area in square meters, return the nominal power
 * of the area if it were a solar installation.
 * @param area square meters
 */
export function calculatePower(area: number) {
  return area * wattsPerSquareMeter * efficiency;
}
