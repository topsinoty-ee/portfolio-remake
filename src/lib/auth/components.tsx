"use client";

import { Button } from "~/components/ui/button";
import { login, logout } from ".";
import Link from "next/link";
import type { ComponentProps } from "react";
import { SessionProvider, useSession } from "next-auth/react";

type ButtonProps = ComponentProps<typeof Button>;
type LinkProps = ComponentProps<typeof Link>;

export const LoginButton = (props: Partial<ButtonProps> & { provider: "github" | "google" }) => (
  <Button {...props} onClick={() => login("github")}>
    Login
  </Button>
);

// TODO: Fix the state not changing
export const LogoutButton = (props?: ButtonProps) => {
  const { data: session, status } = useSession<true>();
  if (!session) return null;
  console.log(status);
  console.log(session);

  return (
    <Button {...props} onClick={() => logout()}>
      Logout
    </Button>
  );
};

export const LoginLink = (props?: LinkProps) => (
  <Link {...props} href="/auth">
    Login
  </Link>
);

export const AuthWrapper = (props: ComponentProps<typeof SessionProvider>) => <SessionProvider {...props} />;
