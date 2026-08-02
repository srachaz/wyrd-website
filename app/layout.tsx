import type { Metadata } from "next";
import { Geist, Geist_Mono, Fredoka, Nunito, Varela_Round } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const varelaRound = Varela_Round({
  variable: "--font-varela-round",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "WYRD - Weird Life Trajectories",
  description: "An original interview series exploring weird life trajectories. Produced by Sracha.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="shortcut icon" href="/favicon-32.png" />
        <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fredoka.variable} ${nunito.variable} ${varelaRound.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
