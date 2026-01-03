"use client";

import { useEffect, useRef } from "react";

const CHARSET = " .:-=+*~";

export default function NotFoundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

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

    const draw = (time: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      const t = time * 0.001;
      const size = Math.min(width, height);
      const centerX = width / 2;
      const centerY = height / 2;
      const fontSize = Math.max(10, size * 0.04);
      const charW = fontSize * 0.6;
      const charH = fontSize * 1.1;
      const cols = Math.max(20, Math.floor(width / charW));
      const rows = Math.max(20, Math.floor(height / charH));

      ctx.font = `${fontSize}px \"Paper Mono\", \"IBM Plex Mono\", \"JetBrains Mono\", monospace`;
      ctx.textBaseline = "top";
      ctx.fillStyle = "rgba(31, 28, 22, 0.65)";

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const px = col * charW;
          const py = row * charH;
          const dx = px + charW * 0.5 - centerX;
          const dy = py + charH * 0.5 - centerY;
          const r = Math.sqrt(dx * dx + dy * dy) / (size * 0.5);
          const angle = Math.atan2(dy, dx);
          const swirl = angle + t * 0.9 + r * 5.2;
          const wave = Math.sin(swirl * 2 + r * 6 - t * 1.4);
          const falloff = Math.max(0, 1 - r * r);
          const value = (wave * 0.5 + 0.5) * falloff;
          const index = Math.min(
            CHARSET.length - 1,
            Math.max(0, Math.floor(value * (CHARSET.length - 1)))
          );
          ctx.fillText(CHARSET[index], px, py);
        }
      }
    };

    const tick = (time: number) => {
      draw(time);
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
  }, []);

  return <canvas className="not-found-canvas" ref={canvasRef} aria-hidden="true" />;
}
