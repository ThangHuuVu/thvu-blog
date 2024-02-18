"use client";

import { ThemeProvider } from "next-themes";

export function AppProviders({ children }: React.PropsWithChildren<{}>) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
