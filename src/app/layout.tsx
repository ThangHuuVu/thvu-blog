import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thang Vu — Creative Technologist",
  description:
    "Personal landing page for Thang Vu, exploring design with an engineer's curiosity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
