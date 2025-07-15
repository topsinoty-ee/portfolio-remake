import type { ReactNode } from "react";

export default function AuthPageLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="min-h-[calc(80%-64px g)] flex w-full items-center justify-center md:py-16">
      <div className="border-border bg-popover w-full max-w-md border p-8 shadow-lg sm:p-10">{children}</div>
    </main>
  );
}
