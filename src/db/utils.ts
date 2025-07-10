export function mapSlugToId<T extends { slug: string }>(doc: T): Omit<T, "_id" | "slug"> & { id: string } {
  if (typeof doc === "object" && doc !== null && "_id" in doc) {
    const id = doc.slug
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/--+/g, "-");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, slug, ...rest } = doc;

    return {
      ...rest,
      id,
    };
  }

  throw new Error("Invalid document: must contain slug and _id");
}
