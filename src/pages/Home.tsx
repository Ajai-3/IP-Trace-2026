import React from 'react';
import SearchBox from '../components/SearchBox';
import IpDetailsCard from '../components/IpDetailsCard';
import MapDisplay from '../components/MapDisplay';
import { Skeleton } from '@/components/ui/skeleton';
import { Terminal } from 'lucide-react';
import { useIpTrace } from '@/hooks/useIpTrace';

const Home: React.FC = () => {
  const { data, loading, error, fetchIpData } = useIpTrace();

  return (
    <div className="h-full flex flex-col gap-4 lg:gap-6 animate-in fade-in duration-1000 lg:overflow-hidden py-4 lg:py-0">
      <div className="text-center space-y-3 shrink-0">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/50 tracking-widest uppercase">
          <Terminal size={12} /> Terminal Access Initialized
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase hacking-text italic">
          Network <span className="text-primary/20">Interception</span>
        </h2>
        <SearchBox onSearch={fetchIpData} isLoading={loading} />
      </div>

      {error && (
        <div className="p-3 border border-red-500/50 bg-red-500/10 text-red-500 text-[10px] text-center font-bold tracking-widest uppercase rounded shrink-0 animate-pulse">
          {error}
        </div>
      )}

      <div className="flex-1 min-h-0">
        {loading ? (
          <div className="flex flex-col lg:flex-row gap-4 h-full">
            <div className="w-full lg:w-1/3 overflow-hidden flex flex-col">
              <Skeleton className="h-full w-full bg-primary/5" />
            </div>
            <div className="w-full lg:w-2/3 overflow-hidden h-[400px] lg:h-full">
              <Skeleton className="h-full w-full bg-primary/5" />
            </div>
          </div>
        ) : data ? (
          <div className="flex flex-col lg:flex-row gap-4 h-full">
            <div className="w-full lg:w-1/3 overflow-hidden flex flex-col">
              <IpDetailsCard data={data} />
            </div>
            <div className="w-full lg:w-2/3 overflow-hidden border border-white/5 rounded-lg shadow-2xl h-[400px] lg:h-full">
              <MapDisplay lat={data.lat} lon={data.lon} />
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center border border-dashed border-white/10 rounded-lg relative overflow-hidden bg-white/[0.01]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] animate-pulse" />
            <p className="text-white/20 text-xs tracking-[0.4em] uppercase relative z-10 font-black hacking-text">Awaiting Vector Signal...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
