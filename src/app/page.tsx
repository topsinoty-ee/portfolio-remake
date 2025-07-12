import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { SectionHeader } from "~/components/ui/sectionHeader";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { ExternalLink, Luggage } from "lucide-react";
import { ProjectsList } from "./_components/projects";
import { SkillBadgeList } from "~/components/ui/skillBadgeList";
import { DataCard } from "./_components/datacard";
import { ContactForm } from "./_components/contactForm";

export default function HomePage() {
  return (
    <main className="flex flex-col gap-20 md:gap-32">
      <section className="flex h-full max-h-max w-full flex-col gap-0 md:flex-row md:flex-wrap md:gap-20 lg:flex-nowrap">
        <div className="order-1 flex h-full min-h-96 w-full flex-col gap-15 md:gap-10">
          <div className="flex flex-col gap-2 md:gap-2.5">
            <Badge className="bg-secondary text-secondary-foreground rounded-2xl px-4 md:text-lg">Frontend dev</Badge>
            <div>
              <SectionHeader size="lg">Hi world!</SectionHeader>
              <h2 className="text-xl font-light md:text-2xl">
                I&apos;m <span className="text-accent font-semibold">Promise</span>, a developer that cares about
                maintainable code and scalable web solutions &#x1f64c;
              </h2>
            </div>
          </div>

          <div className="flex gap-2.5 *:font-semibold md:gap-5">
            <Button variant={"secondary"} asChild>
              <Link href="#contactMe">Contact me</Link>
            </Button>
            <Button variant={"link"} className="text-secondary" asChild>
              <Link href="/projects">View my projects</Link>
            </Button>
          </div>
        </div>
        <div className="drop-shadow-accent shadow-accent border-card relative z-31 order-2 flex h-full min-h-96 w-full place-content-center place-items-center rounded-2xl bg-[0] p-1 shadow drop-shadow-sm sm:min-w-96">
          <div className="bg-popover/99 flex h-max max-h-full w-full flex-col gap-5 rounded-2xl sm:h-96">
            <DataCard />
          </div>
        </div>
      </section>
      <section id="projects" className="flex h-full w-full flex-col items-center gap-15 md:gap-20">
        <div className="flex w-full flex-col gap-10">
          <div className="flex flex-col items-center gap-2.5 text-center">
            <Badge className="select-none" variant={"default"}>
              Project showcase
            </Badge>
            <div>
              <SectionHeader type="secondary">Featured Projects</SectionHeader>
              <p className="text-muted-foreground text-sm font-light md:text-lg">
                Just a collection of projects to show my skills.
              </p>
            </div>
          </div>

          <ProjectsList />
        </div>

        <div className="flex w-full items-center justify-start gap-4">
          <Button variant={"outline"} asChild>
            <Link href="https://github.com/topsinoty-ee?tab=repositories" target={"_blank"} rel={"noopener noreferrer"}>
              <SiGithub />
              My repos
            </Link>
          </Button>
          <Button variant={"link"} asChild className={"font-medium"}>
            <Link href="/projects">
              <Luggage />
              Other projects
            </Link>
          </Button>
        </div>
      </section>
      <section id="aboutMe" className="flex h-full min-h-max w-full flex-col items-start gap-15 md:gap-20 lg:flex-row">
        <div className="flex h-max w-full flex-col items-start gap-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge>Who am I?</Badge>
              </TooltipTrigger>
              <TooltipContent>
                <a href="https://www.youtube.com/watch?v=BBJa32lCaaY" target="_blank" rel="noopener noreferrer">
                  {"¯\\_(ツ)_/¯"}
                </a>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <SectionHeader type="info">You can call me Promise</SectionHeader>
          <p className="inline-flex flex-col gap-2 text-sm font-medium md:text-lg">
            <span className="text-muted-foreground">
              I&apos;m a frontend dev who loves dabbling across tech to build modular, scalable web experiences!
            </span>
            <span>
              I specialize in crafting clean, fast apps with modern JavaScript frameworks. I obsess over clean code,
              smart architecture, and seamless user experiences. When I&apos;m not coding, you&apos;ll find me either
              reading a really good book or or on the court 🏀
            </span>
          </p>
          <Button asChild className="group">
            <a href="/promise_temitope.pdf" target="_blank" rel="noopener noreferrer">
              My CV <ExternalLink className="group-hover:animate-in" />
            </a>
          </Button>
          <SkillBadgeList
            skills={{
              core: ["React", "Next.js", "TypeScript", "Node.js", "TailwindCSS"],
              tools: ["Git", "Figma", "Vitest", "Postman", "Apollo Client"],
              others: ["MongoDB", "Shadcn/ui", "GraphQL", "Angular", "Flask", "Python", "Express.js", "Java", "nx"],
            }}
          />
        </div>

        <div className="border-border hover:drop-shadow-secondary from-muted/30 to-card bg-popover/80 drop-shadow-primary relative h-max w-full self-center overflow-hidden rounded-lg border bg-gradient-to-br p-1 drop-shadow-md transition-all duration-1000">
          <div className="bg-card flex h-full flex-col gap-5 rounded-md p-5">
            <h3 className="text-xl font-bold">Quick Facts</h3>
            <ul className="flex flex-col gap-3">
              {[
                "Very curious developer",
                "Started when I was 13 and still growing",
                "I speak English, Estonian and Yoruba",
                "I know a bit about a lot, from frontend to backend, and everything in between",
                "I like building custom tools and libs that make development smoother",
              ].map((fact, idx) => (
                <li key={idx} className="flex items-start">
                  <div className="bg-primary/20 text-primary mt-0.5 mr-3 flex aspect-square size-7.5 items-center justify-center rounded-full">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="mt-1">{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section
        id="contactMe"
        className="flex h-full min-h-max w-full flex-col items-start gap-15 md:gap-20 lg:flex-row"
      >
        <div className="flex w-full flex-col gap-10">
          <div className="flex w-full flex-col gap-5">
            <Badge variant={"secondary"}>Contact me!</Badge>
            <div>
              <SectionHeader type="secondary">Get in touch</SectionHeader>
              <p className="text-muted-foreground text-sm font-light md:text-lg">I&apos;m almost always online</p>
            </div>
          </div>
          {/* <Socials withText /> */}
        </div>
        <ContactForm />
      </section>
    </main>
  );
}
