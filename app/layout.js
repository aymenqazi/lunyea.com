import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans-base",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

export const metadata = {
  title: "Luneya. Stop Snoring. Start Sleeping.",
  description:
    "Surgical, in-office procedures, and device options for snoring and sleep apnea. Physician-led, evidence-based care in Edmonton and Calgary.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${instrument.variable}`}>
      <body>{children}</body>
    </html>
  );
}
