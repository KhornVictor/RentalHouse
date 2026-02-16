import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "RentalHouse",
  description:
    "Find your perfect rental home with RentalHouse - the ultimate platform for discovering and booking rental properties. Explore a wide range of listings, from cozy apartments to spacious houses, all in one place. Start your rental journey today and find your dream home with ease!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
