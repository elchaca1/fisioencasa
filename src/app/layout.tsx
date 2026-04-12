import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fisioterapeuta a Domicilio en Lima | Dolor Lumbar | FisioVida",
  description:
    "Fisioterapeuta a domicilio en Lima. Tratamiento de dolor lumbar, hernias discales, corrección postural y rehabilitación deportiva. Agenda tu cita hoy.",
  keywords: [
    "fisioterapia a domicilio Lima",
    "dolor lumbar tratamiento Lima",
    "fisioterapeuta en casa Lima",
    "rehabilitación deportiva Lima",
    "corrección postural Lima",
    "terapia física Lima",
    "hernia discal tratamiento Lima",
  ],
  authors: [{ name: "FisioVida" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Fisioterapeuta a Domicilio en Lima | FisioVida",
    description:
      "Recupera tu movilidad sin salir de casa. Tratamiento profesional de dolor lumbar, hernias discales y corrección postural a domicilio en Lima.",
    url: "https://fisiovida.pe",
    siteName: "FisioVida",
    type: "website",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fisioterapeuta a Domicilio en Lima | FisioVida",
    description:
      "Recupera tu movilidad sin salir de casa. Fisioterapia profesional a domicilio en Lima.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
