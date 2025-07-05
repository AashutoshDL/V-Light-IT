import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Syncopate } from "next/font/google";

const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"], // you can choose based on your design
  display: "swap",
});

export const metadata: Metadata = {
  title: "V-light IT Shop",
  description: "best IT shop on town",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${syncopate.className} antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
