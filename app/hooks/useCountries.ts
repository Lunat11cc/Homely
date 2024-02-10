import countries from 'world-countries';

const regions: Record<string, string> = {
    Africa: 'Африка',
    Americas: 'Америка',
    Asia: 'Азия',
    Europe: 'Европа',
    Oceania: 'Океания',
    Antarctic: 'Антарктика'
};

const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.translations.rus.common,
    flag: country.flag,
    latlng: country.latlng,
    region: regions[country.region],
}));

const useCountries = () => {
    const getAll = () => formattedCountries;

    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value);
    }

    return {
        getAll,
        getByValue
    }
};

export default useCountries;