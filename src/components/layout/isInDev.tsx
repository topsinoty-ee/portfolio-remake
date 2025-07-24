"use client";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export function WipBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Alert variant="destructive" className="relative rounded-none bg-yellow-400">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Work In Progress</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        This app is still being built. Things may break, look weird, or change without warning.{" "}
        <Button className="w-max text-amber-900" asChild variant="outline">
          <Link href={"/my-thoughts"}>See my thoughts</Link>
        </Button>
      </AlertDescription>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-6 w-6 p-1"
        onClick={() => setVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>
    </Alert>
  );
}
