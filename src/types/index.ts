export interface IpApiResponse {
  status: string;
  country: string;
  countryCode: string;
  regionName: string;
  city: string;
  isp: string;
  org: string;
  as: string;
  query: string;
  hosting: boolean;
  proxy: boolean;
  mobile: boolean;
  lat: number;
  lon: number;
  zip: string;
  timezone: string;
  addressDetails?: any;
  countryDetails?: any;
}
