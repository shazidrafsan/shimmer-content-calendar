import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";

const wordmark = Cormorant_Garamond({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--font-wordmark",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shimmer The Label — Content Calendar",
  description:
    "Instagram-style preview of the Shimmer The Label content calendar.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#fafafa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={wordmark.variable}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
