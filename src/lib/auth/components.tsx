"use client";

import { Button } from "~/components/ui/button";
import { login } from "./login";
import { logout } from "./logout";
import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<typeof Button>;
type LinkProps = ComponentProps<typeof Link>;

export const LoginButton = (props?: ButtonProps) => (
  <Button {...props} onClick={() => login()}>
    Login
  </Button>
);

export const LogoutButton = (props?: ButtonProps) => (
  <Button {...props} onClick={() => logout()}>
    Logout
  </Button>
);

export const LoginLink = (props?: LinkProps) => (
  <Link {...props} href="/login">
    Login
  </Link>
);
