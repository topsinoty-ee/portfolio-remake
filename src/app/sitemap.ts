import type { MetadataRoute } from "next";
import { env } from "~/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: String(env.WEBSITE),
      lastModified: new Date(),
    },
  ];
}
