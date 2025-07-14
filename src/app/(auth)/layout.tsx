import type { ReactNode } from "react";

export default function AuthPageLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <section className="flex aspect-video max-h-screen w-full flex-1 justify-end overflow-hidden bg-[url('/auth-page.jpg')] bg-contain bg-left-top bg-no-repeat">
      <section className="flex h-full w-full flex-col self-end overflow-auto bg-[url('/auth-page.jpg')] lg:w-2/5 lg:bg-none">
        {" "}
        {children}
      </section>
    </section>
  );
}
