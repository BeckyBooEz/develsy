import type { Metadata } from "next";

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
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}