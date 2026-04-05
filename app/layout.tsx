'use client'

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import AuthProvider from "./auth/Provider";
import "@radix-ui/themes/styles.css";
import { Container, Theme } from "@radix-ui/themes";
import LayoutShell from "./layoutShell";


const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});


export const metadata: Metadata = {
  title: {
    default: "Bootcamp",
    template: "%s | Bootcamp",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased `}>
        <Container>
        <AuthProvider>
        <Theme>
        <LayoutShell>
        {children}
        </LayoutShell>
        </Theme>
        </AuthProvider>
        </Container>
      </body>
    </html>
  );
}
