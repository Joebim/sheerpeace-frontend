import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import UserNav from "@/components/nav/UserNav";
import ShowNav from "@/components/nav/ShowNav";
import AnnounceBar from "@/components/AnnounceBar";
import Footer from "@/components/footer/Footer";
import ShowFooter from "@/components/footer/ShowFooter";
import { Toaster } from "sonner";
import GlobalProvider from "@/context/GlobalProvider";
import QueryProvider from "@/context/QueryProvider";

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
  const restrictedPathsToNav = ["/auth/signup", "/auth/login"];
  const restrictedPathsToFooter = ["/auth/signup", "/auth/login"];

  return (
    <html lang="en">
      <body className={`${poppins.className} bg-white`}>
        <QueryProvider>
          <ShowNav restrictedPaths={restrictedPathsToNav}>
            <AnnounceBar />
            <UserNav />
          </ShowNav>
          <GlobalProvider>{children}</GlobalProvider>
          <ShowFooter restrictedPaths={restrictedPathsToFooter}>
            <Footer />
          </ShowFooter>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
