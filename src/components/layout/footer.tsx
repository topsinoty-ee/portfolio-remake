import { Badge } from "../ui/badge";
import { SectionHeader } from "../ui/sectionHeader";
// import { Socials } from "../ui/socials";
// import { LoginButton, LogoutButton } from "~/components/ui/button.tsx";

export const Footer = () => (
  <footer className="bg-card border-t-border drop-shadow-border relative z-50 flex h-max max-h-80 w-full flex-col justify-between gap-5 border-t p-10 drop-shadow-xs backdrop-blur-lg md:flex-row md:p-20">
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <SectionHeader className="w-max gap-0 select-none">
            Devfolio<span className="text-secondary">.v25</span>
          </SectionHeader>
          <p className="text-muted-foreground font-light">
            Basic portfolio to show my skills
          </p>
        </div>
        {/* <Socials /> */}
      </div>
      <Badge variant={"secondary"} className="rounded-full">
        © 2025{" "}
        <a href="https://github.com/topsinoty-ee/portfolio-2025">
          @topsinoty-ee
        </a>
        . All rights reserved.
      </Badge>
      {/* <LoginButton variant={"secondary"} />
      <LogoutButton variant={"destructive"} /> */}
    </div>

    <div className="hidden h-full w-1/2 items-end justify-end self-end bg-black md:flex">
      <Badge
        variant="outline"
        className="drop-shadow-accent bg-card px-4 py-2.5 text-lg drop-shadow-xs"
      >
        Find me online @topsinoty
      </Badge>
    </div>
  </footer>
);
