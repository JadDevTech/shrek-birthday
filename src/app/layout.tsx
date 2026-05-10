import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mariantonietta Calzone \u00B7 Compleanno nella Palude",
  description: "29 Maggio 2026 \u2014 Pergamena d'invito per il compleanno di Mariantonietta. Scegli il tuo personaggio e raggiungici nella palude.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="parchment">
        {children}
      </body>
    </html>
  );
}
