"use server";
import { signIn, signOut } from "~/auth";
import { revalidatePath } from "next/cache";

export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

export const login = async (provider: "github" | "google") => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};
