import axios from 'axios';
import type { IpApiResponse } from '@/types';

export const useGeoEnrichment = () => {
  const enrichData = async (baseData: Partial<IpApiResponse>) => {
    const nominatimUrl = import.meta.env.VITE_NOMINATIM_URL;
    const countryUrl = import.meta.env.VITE_REST_COUNTRIES_URL;

    if (baseData.lat && baseData.lon) {
      try {
        const geoRes = await axios.get(nominatimUrl, {
          params: { lat: baseData.lat, lon: baseData.lon, format: 'json' },
          headers: { 'Accept-Language': 'en' }
        });

        if (geoRes.data && !geoRes.data.error) {
          baseData.addressDetails = geoRes.data;
          const addr = geoRes.data.address;
          if (addr) {
            baseData.city = addr.city || addr.town || addr.village || baseData.city;
            baseData.country = addr.country || baseData.country;
            baseData.regionName = addr.state || addr.region || baseData.regionName;
          }
        }
      } catch (e) {
        console.warn('Geo enrichment failed');
      }
    }

    if (baseData.country && baseData.country !== 'Unknown') {
      try {
        let restRes = await axios.get(`${countryUrl}${encodeURIComponent(baseData.country)}`, {
          params: { fullText: true }
        });
        
        if (!restRes.data || restRes.data.length === 0) {
          restRes = await axios.get(`${countryUrl}${encodeURIComponent(baseData.country)}`);
        }

        if (restRes.data && restRes.data.length > 0) {
          baseData.countryDetails = restRes.data[0];
        }
      } catch (e) {
        console.warn('Country enrichment failed');
      }
    }

    return baseData as IpApiResponse;
  };

  return { enrichData };
};
