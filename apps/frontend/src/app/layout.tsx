import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/footer/Footer";
import Header from "@/components/ui/header/Header";
import React from "react";
import { DropdownProvider } from "@/components/context/DropdownContext";
import { SessionProvider } from "next-auth/react";

const kumbhSans = Kumbh_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clínica Odonto+",
  description:
    "Clínica especializada em tratamentos odontológico como ortodontia...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kumbhSans.className}>
        <SessionProvider>
          <DropdownProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </DropdownProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
