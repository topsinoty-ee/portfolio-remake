import "~/styles/globals.css";

import { type Metadata } from "next";
import { JetBrains_Mono, Ubuntu_Sans } from "next/font/google";
import { Navbar } from "~/components/layout/navbar";
import { env } from "~/env";
import { type ReactNode } from "react";
import { WipBanner } from "~/components/layout/isInDev";
import { auth } from "~/auth";
import "@total-typescript/ts-reset";
import { AuthWrapper } from "~/lib/auth/components";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Promise",
  url: String(env.WEBSITE),
  sameAs: [
    "https://github.com/topsinoty-ee",
    "https://www.linkedin.com/in/promise-temitope",
    // Other shit
  ],
  jobTitle: "Frontend Developer",
  address: {
    "@type": "PostalAddress",
    addressCountry: "Estonia",
  },
  alumniOf: {
    "@type": "Organization",
    name: "Tallinna Mustamäe Gümnaasium",
  },
  knowsAbout: [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "JavaScript",
    "Web Development",
    "Git",
    "Figma",
    "Vitest",
    "Postman",
    "Apollo Client",
    "MongoDB",
    "Shadcn/ui",
    "GraphQL",
    "Angular",
    "Flask",
    "Python",
    "Express.js",
    "Java",
    "nx",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(String(env.WEBSITE)),
  title: {
    default: "Promise Temitope | Portfolio",
    template: "Promise Temitope | %s",
  },
  description: "A small portfolio to show my projects and skills",
  openGraph: {
    title: "Promise Temitope | Portfolio",
    description: "A small portfolio to show my projects and skills",
    type: "website",
    locale: "en",
    url: String(env.WEBSITE),
    siteName: "Promise Temitope",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  alternates: {
    canonical: String(env.WEBSITE),
    languages: {
      "en-US": "/",
    },
  },
  keywords: [
    "topsinoty",
    "promise",
    "promise temitope",
    "dev",
    "developer",
    "portfolio",
    "Oluwatobiloba Promise Temitope",
    "Frontend development",
    "Promise",
    "frontend developer",
    "React developer",
    "TypeScript developer",
    "Tailwind CSS",
    "JavaScript",
    "web developer portfolio",
    "Estonia developer",
    "Next.js portfolio",
    "open source contributor",
    "creative frontend engineer",
    "modern web apps",
    "developer portfolio site",
    "freelance frontend developer",
    "UI engineer",
    "Estonia web developer",
    "Codesters.club",
    ...jsonLd.knowsAbout,
  ],
  other: {
    "script:ld+json": JSON.stringify(jsonLd),
  },
};

const ubuntu = Ubuntu_Sans({
  subsets: ["latin"],
  variable: "--font-ubuntu",
});

const jets = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jets",
});

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const session = await auth();
  return (
    <html lang="en" className={`${jets.variable} ${ubuntu.variable}`}>
      <AuthWrapper session={session}>
        <body className="flex min-h-screen flex-col">
          <WipBanner />
          <Navbar />
          <section className="flex flex-1 flex-col">{children}</section>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
            }}
          />
        </body>
      </AuthWrapper>
    </html>
  );
}
