import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function useDarkTheme() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  //  Avoid Hydration Mismatch
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  return [isDark, mounted, setTheme] as const;
}
