import type { ReactNode } from "react";

export default function AuthPageLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center md:py-16">
      <div className="border-border bg-popover w-full max-w-md border p-8 shadow-lg sm:p-10">{children}</div>
    </main>
  );
}
