import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "SocialGems | Creator Opportunities Platform",
  description:
    "Find paid campaigns, creator jobs, affiliate programs, collaborations, and creator growth tools on SocialGems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
