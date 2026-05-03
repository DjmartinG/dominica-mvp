import type { Metadata, Viewport } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apartamentos Dominica · Pereira",
  description: "Imagina despertar cada día rodeado de la tranquilidad, el diseño y la frescura de una isla caribeña, sin salir de la ciudad. NO VIS Premium en Pereira por CG Constructora.",
  keywords: ["Dominica", "Apartamentos", "Pereira", "CG Constructora", "Vivienda Premium", "NO VIS"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1B2D5C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${cormorant.variable}`}>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased bg-white text-negro`}>
        {children}
      </body>
    </html>
  );
}
