import React from 'react';
import PixelatedWorldMap from './PixelatedWorldMap';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen text-white selection:bg-white/20 selection:text-white lg:overflow-hidden overflow-y-auto flex flex-col relative">
      {/* Absolute background layer */}
      <div className="absolute inset-0 bg-black -z-10" />

      <PixelatedWorldMap />

      {/* HUD Lines */}
      <div className="fixed inset-0 pointer-events-none border-[1px] border-white/5 m-4 z-50 rounded-lg">
        <div className="absolute top-0 left-10 w-40 h-[1px] bg-white/20" />
        <div className="absolute bottom-0 right-10 w-40 h-[1px] bg-white/20" />
        <div className="absolute top-10 left-0 w-[1px] h-40 bg-white/20" />
        <div className="absolute bottom-10 right-0 w-[1px] h-40 bg-white/20" />
      </div>

      {/* Header HUD */}
      <header className="relative z-10 px-4 lg:px-8 py-4 flex justify-between items-center border-b border-white/5 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 border border-white flex items-center justify-center font-black text-xs">
            IP
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold tracking-[0.3em] uppercase hacking-text">
              Trace OS / 2026
            </h1>
            <p className="text-[9px] text-white/30 tracking-[0.1em] uppercase">
              Global Network Intelligence
            </p>
          </div>
        </div>
        <div className="flex gap-8 text-[9px] text-white/40 tracking-[0.2em] uppercase font-bold">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            System Live
          </div>
          <div>v4.0.2_SECURE</div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 lg:px-20 py-2 flex-1 min-h-0">
        {children}
      </main>

      <footer className="relative z-10 border-t border-white/5 py-2 px-4 lg:px-8 flex justify-between items-center text-[8px] text-white/20 tracking-[0.2em] uppercase shrink-0">
        <div>© 2026 NEXUS SHADOW PROTOCOL</div>
        <div>AUTHORIZED ACCESS ONLY</div>
      </footer>
    </div>
  );
};

export default Layout;
