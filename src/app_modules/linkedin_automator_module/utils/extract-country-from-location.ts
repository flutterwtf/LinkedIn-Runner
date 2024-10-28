export function extractCountryFromLocation(location: string = ''): string {
  const locationArr = location!.split(',');
  const country = locationArr.length
    ? locationArr[locationArr.length - 1]?.trim()
    : location!.trim();

  return country || '';
}
