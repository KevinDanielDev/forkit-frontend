import { ref } from 'vue';

interface Country {
  label: string;
  value: string;
  dial?: string;
}

export const useCountrySelect = () => {
  // List of countries with country codes (ISO 3166-1 alpha-2) and dial codes
  const countries = ref<Country[]>([
    { label: 'United States', value: 'US', dial: '+1' },
    { label: 'Canada', value: 'CA', dial: '+1' },
    { label: 'Mexico', value: 'MX', dial: '+52' },
    { label: 'Brazil', value: 'BR', dial: '+55' },
    { label: 'Argentina', value: 'AR', dial: '+54' },
    { label: 'Colombia', value: 'CO', dial: '+57' },
    { label: 'Spain', value: 'ES', dial: '+34' },
    { label: 'United Kingdom', value: 'GB', dial: '+44' },
    { label: 'Germany', value: 'DE', dial: '+49' },
    { label: 'France', value: 'FR', dial: '+33' },
    { label: 'Italy', value: 'IT', dial: '+39' },
    { label: 'Portugal', value: 'PT', dial: '+351' },
    { label: 'Netherlands', value: 'NL', dial: '+31' },
    { label: 'Belgium', value: 'BE', dial: '+32' },
    { label: 'Switzerland', value: 'CH', dial: '+41' },
    { label: 'Austria', value: 'AT', dial: '+43' },
    { label: 'Poland', value: 'PL', dial: '+48' },
    { label: 'Czech Republic', value: 'CZ', dial: '+420' },
    { label: 'Hungary', value: 'HU', dial: '+36' },
    { label: 'Romania', value: 'RO', dial: '+40' },
    { label: 'Greece', value: 'GR', dial: '+30' },
    { label: 'Turkey', value: 'TR', dial: '+90' },
    { label: 'Russia', value: 'RU', dial: '+7' },
    { label: 'India', value: 'IN', dial: '+91' },
    { label: 'Japan', value: 'JP', dial: '+81' },
    { label: 'China', value: 'CN', dial: '+86' },
    { label: 'Australia', value: 'AU', dial: '+61' },
    { label: 'New Zealand', value: 'NZ', dial: '+64' },
    { label: 'Singapore', value: 'SG', dial: '+65' },
    { label: 'Thailand', value: 'TH', dial: '+66' },
    { label: 'Philippines', value: 'PH', dial: '+63' },
    { label: 'Indonesia', value: 'ID', dial: '+62' },
    { label: 'Malaysia', value: 'MY', dial: '+60' },
    { label: 'Vietnam', value: 'VN', dial: '+84' },
    { label: 'South Korea', value: 'KR', dial: '+82' },
  ]);

  const getDialCode = (countryCode: string): string => {
    const country = countries.value.find((c) => c.value === countryCode);
    return country?.dial || '';
  };

  const getCountryLabel = (countryCode: string): string => {
    const country = countries.value.find((c) => c.value === countryCode);
    return country?.label || '';
  };

  const searchCountries = (query: string): Country[] => {
    if (!query) return countries.value;
    const lowerQuery = query.toLowerCase();
    return countries.value.filter(
      (country) =>
        country.label.toLowerCase().includes(lowerQuery) || country.value.toLowerCase().includes(lowerQuery),
    );
  };

  return {
    countries,
    getDialCode,
    getCountryLabel,
    searchCountries,
  };
};
