import "~/styles/globals.css";

import { type Metadata } from "next";
import { JetBrains_Mono, Ubuntu_Sans } from "next/font/google";
import { Navbar } from "~/components/layout/navbar";
import { Footer } from "~/components/layout/footer";
import { env } from "~/env";

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark:dark ${jets.variable} ${ubuntu.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <section className="flex-1 p-10 md:p-20">{children}</section>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
