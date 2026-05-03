import type { Metadata, Viewport } from "next";
import { Roboto, Montserrat, Roboto_Slab } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-slab",
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
  themeColor: "#006D68",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${roboto.variable} ${montserrat.variable} ${robotoSlab.variable}`}>
      <body className={`${roboto.className} min-h-screen flex flex-col antialiased`}>
        {children}
      </body>
    </html>
  );
}
