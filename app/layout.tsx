import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ventoro Trips",
  description: "Premium tours and boat experiences in Porec, Istria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}