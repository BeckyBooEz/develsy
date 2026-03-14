import type { Metadata } from "next";
import './globals.css';

export const metadata: Metadata = {
  title: "Develsy",
  description: "Pagína de inicio de Develsy",
  openGraph: {
    title: "Develsy",
    description: "Pagina de inicio de Develsy",
    url: "https://develsy.com",
    siteName: "Develsy",
    images: [
      {
        url: "/img/64x64_Black.png",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}