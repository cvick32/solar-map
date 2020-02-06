// these seem like a reasonable averages (https://en.wikipedia.org/wiki/Solar_panel#Efficiencies)
const kWattsPerSquareMeter = 250;
const efficiency = .2;

// OUTPUT (kWh/day) = ARRAY AREA (m2) x ARRAY EFFICIENCY (%) x AVERAGE INSOLATION == 1 (kWh/m2/day)
// from (https://thegrid.rexel.com/en-us/forums/renewable-and-energy-efficiency/f/forum/350/how-is-the-nominal-power-of-a-solar-pv-module-defined)
/**
 * Given an area in square meters, return the nominal power in
 * Kilowatts of the area if it were a solar installation.
 * @param area square meters
 */
export function calculatePower(area: number) {
  const kwH = (area * efficiency) / 1000;
  if (kwH < 5) {
    return kwH;
  }
  return Math.round((kwH));
}
