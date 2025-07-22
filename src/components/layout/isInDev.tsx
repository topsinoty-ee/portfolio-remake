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
    <Alert variant="destructive" className="relative rounded-none bg-yellow-400 text-amber-900">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Work In Progress</AlertTitle>
      <AlertDescription>
        This app is still being built. Things may break, look weird, or change without warning.{" "}
        <Link href={"my-thoughts"}>See my thoughts</Link>
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
