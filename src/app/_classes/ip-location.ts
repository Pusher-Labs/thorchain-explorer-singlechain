interface LangCode {
  code: string;
  name: string;
  native: string;
}

export interface IPLocation {
  ip: string;
  type: string;
  continent_code: string;
  continent_name: string;
  country_code: string;
  country_name: string;
  region_code: string;
  region_name: string;
  city: string;
  zip: string;
  latitude: number;
  longitude: number;
  location: {
    geoname_id: number;
    capital: string;
    languages: LangCode[];
    country_flag: string;
    country_flag_emoji: string;
    country_flag_emoji_unicode: string;
    calling_code: string;
    is_eu: boolean;
  };
}



//For testing purpose
export const sampleLocation: IPLocation = {
  ip: "3.123.167.196",
  type: "ipv4",
  continent_code: "EU",
  continent_name: "Europe",
  country_code: "DE",
  country_name: "Germany",
  region_code: "HE",
  region_name: "Hesse",
  city: "Frankfurt am Main",
  zip: "60311",
  latitude: 50.11090087890625,
  longitude: 8.682100296020508,
  location: {
    geoname_id: 2925533,
    capital: "Berlin",
    languages: [
      {
        code: "de",
        name: "German",
        native: "Deutsch",
      },
    ],
    country_flag: "http://assets.ipstack.com/flags/de.svg",
    country_flag_emoji: "🇩🇪",
    country_flag_emoji_unicode: "U+1F1E9 U+1F1EA",
    calling_code: "49",
    is_eu: true,
  },
};
