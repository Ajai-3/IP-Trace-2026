import React, { useEffect, useRef } from 'react';

const PixelatedWorldMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    const dots: { x: number; y: number; opacity: number; targetOpacity: number }[] = [];
    const gridSize = 20;

    const cols = Math.ceil(width / gridSize);
    const rows = Math.ceil(height / gridSize);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const centerX = cols / 2;
        const centerY = rows / 2;
        const dist = Math.sqrt(Math.pow(i - centerX, 2) + Math.pow(j - centerY, 2));
        const density = Math.max(0.3, 1 - dist / (cols / 1.1));

        if (Math.random() > density) {
          dots.push({
            x: i * gridSize,
            y: j * gridSize,
            opacity: Math.random() * 0.9,
            targetOpacity: Math.random() * 0.9
          });
        }
      }
    }

    let scanLine = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      dots.forEach(dot => {
        if (Math.abs(dot.opacity - dot.targetOpacity) < 0.01) {
          dot.targetOpacity = Math.random() * 0.8;
        }
        dot.opacity += (dot.targetOpacity - dot.opacity) * 0.02;

        const scanDist = Math.abs(dot.y - scanLine);
        const pulse = scanDist < 250 ? (1 - scanDist / 250) * 0.8 : 0;

        ctx.fillStyle = `rgba(0, 255, 0, ${Math.min(0.8, dot.opacity + pulse)})`;
        ctx.fillRect(dot.x, dot.y, 4, 4);
      });

      ctx.strokeStyle = 'rgba(0, 170, 0, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, scanLine);
      ctx.lineTo(width, scanLine);
      ctx.stroke();

      scanLine = (scanLine + 5) % height;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ filter: 'blur(0.5px)' }}
    />
  );
};

export default PixelatedWorldMap;
