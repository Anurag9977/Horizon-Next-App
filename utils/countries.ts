import countries from "world-countries";

export type Country = {
  name: string;
  code: string;
  region: string;
  coordinates: [number, number];
  flag: string;
};

export const formattedCountries: Country[] = countries.map((country) => {
  return {
    name: country.name.common,
    code: country.cca2,
    region: country.region,
    coordinates: country.latlng,
    flag: country.flag,
  };
});

export function getCountryByCode(code: string): Country {
  return formattedCountries.find((country) => country.code === code) as Country;
}
