import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2, MapPin, Globe } from 'lucide-react';

interface SearchBoxProps {
  onSearch: (query: string, isLatLon: boolean) => void;
  isLoading: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, isLoading }) => {
  const [value, setValue] = React.useState('');
  const [mode, setMode] = React.useState<'IP' | 'GEO'>('IP');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;

    if (mode === 'GEO') {
      onSearch(value.trim(), true);
    } else {
      const isLatLon = /^-?\d+\.?\d*,\s*-?\d+\.?\d*$/.test(value.trim());
      onSearch(value.trim(), isLatLon);
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === 'IP' ? 'GEO' : 'IP');
    setValue('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-2">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 group">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {mode === 'IP' ? (
              <Globe className="text-white/20" size={16} />
            ) : (
              <MapPin className="text-white/20" size={16} />
            )}
            <span className="text-[10px] font-black text-white/10 tracking-tighter uppercase border-r border-white/5 pr-2">
              {mode}
            </span>
          </div>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={mode === 'IP' ? "Enter Target IP (e.g. 8.8.8.8)" : "Enter Lat, Lon (e.g. 9.93, 76.26)"}
            className="pl-20 bg-white/[0.02] border-white/10 text-white placeholder:text-white/10 focus-visible:ring-primary/40 h-11 text-sm font-mono tracking-wider"
          />
        </div>
        <div className="flex gap-2">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="h-11 flex-1 md:flex-none md:px-8 bg-primary text-black hover:bg-primary/90 font-black uppercase tracking-[0.2em] text-[10px] shadow-[0_0_15px_rgba(0,255,0,0.1)] transition-all active:scale-95"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : mode === 'IP' ? 'Intercept IP' : 'Grid Search'}
          </Button>
          <Button 
            type="button"
            onClick={toggleMode}
            disabled={isLoading}
            variant="outline"
            className={`h-11 px-4 border-white/10 transition-all ${mode === 'GEO' ? 'bg-primary/10 text-primary' : 'text-white/20 hover:text-white hover:bg-white/5'}`}
            title={mode === 'IP' ? "Switch to Coordinate Search" : "Switch to IP Search"}
          >
            {mode === 'IP' ? <MapPin size={16} /> : <Globe size={16} />}
          </Button>
        </div>
      </form>
      <p className="text-[9px] text-white/20 tracking-widest uppercase text-center font-bold">
        {mode === 'IP' ? "Direct IP Packet Interception Mode" : "Satellite Coordinate Triangulation Mode"}
      </p>
    </div>
  );
};

export default SearchBox;
