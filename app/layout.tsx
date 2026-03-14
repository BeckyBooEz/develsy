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
        url: "/img/OpenGraph.png",
        width: 1080,
        height: 1080,
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