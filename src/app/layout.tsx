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
  title: "Fisioterapeuta a Domicilio en Lima | Neurorrehabilitación, Deportiva y Salud Ocupacional | FisioEnCasa",
  description:
    "Fisioterapeuta a domicilio en Lima. Especialista en Neurorrehabilitación, Fisioterapia Deportiva y Salud Ocupacional. Recupera tu movilidad sin salir de casa. Atención en las mañanas.",
  keywords: [
    "fisioterapia a domicilio Lima",
    "neurorrehabilitación Lima",
    "fisioterapia deportiva Lima",
    "salud ocupacional Lima",
    "fisioterapeuta en casa Lima",
    "rehabilitación neurológica Lima",
    "terapia física Lima",
    "fisioterapeuta Surco Miraflores San Borja",
  ],
  authors: [{ name: "FisioEnCasa" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Fisioterapeuta a Domicilio en Lima | Neurorrehabilitación y Salud Ocupacional | FisioEnCasa",
    description:
      "Recupera tu movilidad sin salir de casa. Especialista en Neurorrehabilitación, Fisioterapia Deportiva y Salud Ocupacional. Atención a domicilio en Lima.",
    url: "https://fisioencasa.pe",
    siteName: "FisioEnCasa",
    type: "website",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fisioterapeuta a Domicilio en Lima | FisioEnCasa",
    description:
      "Especialista en Neurorrehabilitación, Fisioterapia Deportiva y Salud Ocupacional. Atención a domicilio en Lima.",
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
