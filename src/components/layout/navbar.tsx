import { cn } from "~/lib/utils";
import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import { Flashlight, FlashlightOff } from "lucide-react";
import Link from "next/link";
import { auth } from "~/auth";
import { LogoutButton } from "~/lib/auth/components";
// import { useFlashLightContext } from "../ui/flashlightContext";

export const Navbar = async () => {
  const session = await auth();
  //   const { toggle, enabled } = useFlashLightContext();

  // enum RouteTitle {
  //   Home = "Home",
  //   Projects = "ViewMyProjects",
  //   Me = "Me",
  //   Contact = "GetInTouch",
  // }

  // type RouteMapping = Record<string, RouteTitle>;

  // const ROUTE_TO_TITLE_MAP: RouteMapping = {
  //   "/": RouteTitle.Home,
  //   "/projects": RouteTitle.Projects,
  //   "#me": RouteTitle.Me,
  //   "/contact-me": RouteTitle.Contact,
  // } as const;

  // const getRouteTitle = (path: string): RouteTitle => {
  //   return ROUTE_TO_TITLE_MAP[path] ?? RouteTitle.Home;
  // };
  return (
    <header className="bg-card/80 drop-shadow-border sticky top-0 z-50 flex max-h-25 w-full items-baseline justify-between p-5 px-10 drop-shadow-xs backdrop-blur-lg md:px-20">
      <Link href={"/"} className="flex items-center gap-4">
        <Badge variant={"outline"} className={cn("hover: flex cursor-pointer gap-1 p-2.5 text-2xl select-none")}>
          <span className="text-primary font-medium">{"<"}</span>
          <span className="text-primary font-medium">{"/>"}</span>
        </Badge>
        {session?.user && <LogoutButton />}
      </Link>

      <div className="flex items-center gap-5">
        <nav
          className={cn(
            "[&_a]:hover:text-accent hidden w-max *:p-2.5 *:text-xl *:transition-all *:duration-500 md:flex",
          )}
        >
          {/* {location === "/" && <Link href="/#projects">Featured Projects</Link>} */}
          <Link href="/#aboutMe">Me</Link>
          <Link href="/#contactMe">Contact</Link>
        </nav>
        {/* {location === "/" && (
          <Button
            onClick={toggle}
            className={cn("hover:bg-secondary hidden md:block")}
            variant={"ghost"}
            aria-label={enabled ? "Disable flashlight" : "Enable flashlight"}
          >
            {enabled ? <Flashlight /> : <FlashlightOff />}
          </Button>
        )} */}
      </div>
    </header>
  );
};
