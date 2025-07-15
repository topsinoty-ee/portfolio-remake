"use client";

import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";
import { Button } from "~/components/ui/button";
import { SectionHeader } from "~/components/ui/sectionHeader";
import { loginWithGithub, loginWithGoogle } from "~/lib/auth/login";

export default function LoginPage() {
  return (
    <section className="flex h-min w-full flex-col gap-6">
      <div className="flex flex-col gap-2">
        <SectionHeader>Are u real?</SectionHeader>
        <small>Get access to some gate-kept features by authenticating</small>
      </div>
      <div className="flex flex-col">
        <SectionHeader size="sm" type="secondary">
          Use any of the available providers
        </SectionHeader>
        <small>Trust me...there&apos;s a reason this exists</small>
        <div className="my-4 flex aspect-square w-full flex-col gap-4 **:w-max">
          <Button onClick={() => loginWithGithub()}>
            Login with Github <SiGithub />
          </Button>
          <Button onClick={() => loginWithGoogle()}>
            Login with Google <SiGoogle />
          </Button>
        </div>
      </div>
    </section>
  );
}
