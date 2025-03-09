import type {Metadata} from "next";
import {Kumbh_Sans} from "next/font/google";
import "./globals.css";
import {Footer} from "@/components/layout/Footer";
import {Header} from "@/components/layout/Header";
import React from "react";

const kumbhSans = Kumbh_Sans({subsets: ["latin"]});

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
      <body className={kumbhSans.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
