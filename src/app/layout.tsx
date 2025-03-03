import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav/Navbar";
import ShowNav from "@/components/nav/ShowNav";
import AnnounceBar from "@/components/AnnounceBar";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Sheerpeace",
  description: "Shop Peace-minded Essentials",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-white`}>
        <AnnounceBar />
        <ShowNav restrictedPaths={["/signup", "/login"]}>
          <Navbar />
        </ShowNav>
        {children}
      </body>
    </html>
  );
}
