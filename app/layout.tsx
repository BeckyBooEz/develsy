import type { Metadata } from "next";
import './globals.css';

export const metadata: Metadata = {
  title: "Develsy",
  description: "Pagína de inicio de Develsy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}