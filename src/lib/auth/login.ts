"use server";
import { signIn } from "~/auth";

export const loginWithGithub = async () => {
  await signIn("github", { redirectTo: "/" });
};

export const loginWithGoogle = async () => {
  await signIn("google", { redirectTo: "/" });
};
