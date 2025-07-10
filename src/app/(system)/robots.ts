import type { MetadataRoute } from "next";
import { env } from "~/env";

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${String(env.WEBSITE)}/sitemap.xml`,
  };
}
