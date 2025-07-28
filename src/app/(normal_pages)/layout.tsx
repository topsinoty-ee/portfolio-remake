import type { ReactNode } from "react";
import { Footer } from "~/components/layout/footer";

export default function NormalLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <section className="container mx-auto flex-1 px-10 pb-10 md:px-20 md:pb-20">{children}</section>
      <Footer />
    </>
  );
}
