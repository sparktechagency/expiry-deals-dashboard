import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import "@ant-design/v5-patch-for-react-19";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Expiry Deals",
    template: "%s - Expiry Deals",
  },
  description: "Expiry deals admin dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
