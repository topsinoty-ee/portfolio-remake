import type { ReactNode } from "react";
import { Footer } from "~/components/layout/footer";

export default function NormalLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <section className="container mx-auto flex-1 p-10 md:p-20">{children}</section>
      <Footer />
    </>
  );
}
