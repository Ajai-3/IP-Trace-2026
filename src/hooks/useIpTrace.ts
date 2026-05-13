import { useState } from 'react';
import axios from 'axios';
import api from '@/lib/api';
import type { IpApiResponse } from '@/types';
import { useGeoEnrichment } from './useGeoEnrichment';

export const useIpTrace = () => {
  const [data, setData] = useState<IpApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { enrichData } = useGeoEnrichment();

  const fetchIpData = async (query: string = '', isLatLon: boolean = false) => {
    setLoading(true);
    setError(null);
    try {
      let baseData: Partial<IpApiResponse> = {};

      if (isLatLon) {
        const coords = query.split(',').map(s => s.trim());
        if (coords.length < 2) throw new Error('FORMAT ERROR: USE "LAT, LON"');
        
        const lat = coords[0];
        const lon = coords[1];
        
        const nominatimUrl = import.meta.env.VITE_NOMINATIM_URL;
        const geoRes = await axios.get(`${nominatimUrl}`, {
          params: { lat, lon, format: 'json' },
          headers: { 'Accept-Language': 'en' }
        });
        
        if (!geoRes.data || geoRes.data.error) throw new Error('GEO ERROR: LOCATION NOT FOUND');

        const addr = geoRes.data.address || {};
        baseData = {
          lat: parseFloat(lat),
          lon: parseFloat(lon),
          city: addr.city || addr.town || addr.village || addr.suburb || 'Unknown',
          country: addr.country || 'Unknown',
          countryCode: addr.country_code?.toUpperCase() || '??',
          query: `GRID: ${lat}, ${lon}`,
          addressDetails: geoRes.data,
          regionName: addr.state || addr.region || addr.county || 'Unknown',
          zip: addr.postcode || 'N/A',
          isp: 'Satellite Override',
          org: 'Manual Entry',
          as: 'N/A',
          status: 'success',
          timezone: 'Calculated'
        };
      } else {
        const response = await api.get(`${query}`, {
          params: {
            fields: 'status,message,country,countryCode,regionName,city,zip,lat,lon,timezone,isp,org,as,mobile,proxy,hosting,query'
          }
        });
        
        if (response.data.status === 'fail') throw new Error(response.data.message || 'IDENTIFICATION FAILED');
        baseData = response.data;
      }

      const enrichedData = await enrichData(baseData);
      setData(enrichedData);
    } catch (err: any) {
      setError(err.message || 'SIGNAL LOST');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchIpData };
};
