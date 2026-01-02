"use client";

import { useEffect, useRef } from "react";

type WaterProps = {
  speed?: number;
};

const CHARSET = " .:-=+*~";

export default function Water({ speed = 0.35 }: WaterProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const drawRef = useRef<(time: number) => void>(() => undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const observer = new ResizeObserver(() => resize());
    observer.observe(canvas);

    drawRef.current = (time: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const t = time * 0.001 * speed;
      const fontSize = Math.max(12, Math.floor(width / 120));
      const charW = fontSize * 0.6;
      const charH = fontSize * 1.15;
      const cols = Math.max(40, Math.floor(width / charW));
      const rows = Math.max(10, Math.floor(height / charH));

      ctx.font = `${fontSize}px "Paper Mono", "IBM Plex Mono", "JetBrains Mono", monospace`;
      ctx.textBaseline = "top";
      ctx.fillStyle = "rgba(31, 28, 22, 0.6)";

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const x = col / cols;
          const y = row / rows;
          const wave =
            Math.sin(x * 10 + t * 2.2 + row * 0.22) +
            Math.sin(x * 4 - t * 1.3 + y * 4) * 0.6;
          const lift = Math.sin(y * 5 + t * 0.6) * 0.3;
          const value = (wave + lift + 2) / 4;
          const index = Math.min(
            CHARSET.length - 1,
            Math.max(0, Math.floor(value * (CHARSET.length - 1)))
          );
          const ch = CHARSET[index];
          const px = Math.floor(col * charW);
          const py = Math.floor(row * charH);
          ctx.fillText(ch, px, py);
        }
      }
    };

    const tick = (time: number) => {
      drawRef.current(time);
      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [speed]);

  return (
    <div className="water-layer" aria-hidden="true">
      <canvas className="water-canvas" ref={canvasRef} />
    </div>
  );
}
