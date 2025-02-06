import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Footer} from "@/components/layout/Footer";
import {Header} from "@/components/layout/Header";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Clínica Odontológica",
  description:
    "Clínica especializada em tratamentos odontológico como ortodontia..."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
