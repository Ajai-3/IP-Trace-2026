import React from 'react';

interface MapDisplayProps {
  lat: number;
  lon: number;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ lat, lon }) => {
  const mapUrl = `https://www.google.com/maps?q=${lat},${lon}&z=15&output=embed`;

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border border-white/10 shadow-2xl relative">
      <iframe
        title="Google Map"
        width="100%"
        height="100%"
        style={{ 
          border: 0, 
          filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)',
          backgroundColor: '#000'
        }}
        src={mapUrl}
        allowFullScreen
        loading="lazy"
      ></iframe>
      
      <div className="absolute top-4 right-4 z-50 bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-white/20 text-[10px] text-white/70 uppercase tracking-widest pointer-events-none">
        Satellite Tracking Active
      </div>
      
      {/* HUD overlays to make it look cooler */}
      <div className="absolute inset-0 pointer-events-none border-[20px] border-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/20"></div>
    </div>
  );
};

export default MapDisplay;
