import { cn } from "~/lib/utils";
import { Badge } from "../ui/badge";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="bg-card/80 drop-shadow-border sticky top-0 z-50 flex max-h-25 w-full items-baseline justify-between p-5 px-10 drop-shadow-xs backdrop-blur-lg md:px-20">
      <Link href={"/"} className="flex items-center gap-4">
        <Badge variant={"outline"} className={cn("hover: flex cursor-pointer gap-1 p-2.5 text-2xl select-none")}>
          <span className="text-primary font-medium">{"<"}</span>
          <span className="text-primary font-medium">{"/>"}</span>
        </Badge>
      </Link>

      <div className="flex items-center gap-5">
        <nav
          className={cn(
            "[&_a]:hover:text-accent hidden w-max *:p-2.5 *:text-xl *:transition-all *:duration-500 md:flex",
          )}
        >
          <Link href="/#aboutMe">Me</Link>
          <Link href="/#contactMe">Contact</Link>
        </nav>
      </div>
    </header>
  );
};
