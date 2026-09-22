import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const garamond = localFont({
  src: "../public/fonts/EBGaramond-VariableFont_wght.woff",
  variable: "--font-garamond",
  weight: "400 800",
  display: "swap",
});

const sen = localFont({
  src: [
    { path: "../public/fonts/Sen-Regular.woff", weight: "400", style: "normal" },
    { path: "../public/fonts/Sen-Bold.woff", weight: "700", style: "normal" },
  ],
  variable: "--font-sen",
  display: "swap",
});

const swiss = localFont({
  src: [
    { path: "../public/fonts/Swiss721CondensedBT.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Swiss721BoldCondensedBT.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-swiss",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MJM Marine | Exceptional Marine Outfitting",
  description:
    "MJM Marine has over 40 years’ of World Class marine outfitting experience. With in-house manufacturing facilities, MJM can offer clients a complete project management service with bespoke and turnkey outfitting and innovative solutions.",
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#001e2a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${garamond.variable} ${sen.variable} ${swiss.variable}`}>
      <body>{children}</body>
    </html>
  );
}
