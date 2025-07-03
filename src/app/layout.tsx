import "~/styles/globals.css";

import { type Metadata } from "next";
import { JetBrains_Mono, Ubuntu_Sans } from "next/font/google";
import { Navbar } from "~/components/layout/navbar";
import { Footer } from "~/components/layout/footer";

export const metadata: Metadata = {
  title: "Promise Temitope | Portfolio",
  description: "A small portfolio to show my projects and skills",
  openGraph: {
    title: "Promise Temitope | Portfolio",
    description: "A small portfolio to show my projects and skills",
    type: "website",
    locale: "en",
    url: "topsinoty.vercel.app",
    siteName: "Promise Temitope",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const ubuntu = Ubuntu_Sans({
  subsets: ["latin"],
  variable: "--font-ubuntu",
});

const jets = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jets",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark:dark dark ${jets.variable} ${ubuntu.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <section className="flex-1 p-10 md:p-20">{children}</section>
        <Footer />
      </body>
    </html>
  );
}
