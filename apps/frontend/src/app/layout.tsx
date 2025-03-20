import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/ui/footer/Footer";
import Header from "@/components/ui/header/Header";
import React from "react";
import { NavMenuProvider } from "@/components/context/NavMenuContext";
import { UserMenuProvider } from "@/components/context/UserMenuContext";
import { SessionProvider } from "next-auth/react"

const kumbhSans = Kumbh_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clínica Odonto+",
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
        <SessionProvider>
          <NavMenuProvider><UserMenuProvider><Header /></UserMenuProvider></NavMenuProvider>
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>

    </html>
  );
}
