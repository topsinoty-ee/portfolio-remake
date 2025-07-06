export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = params.then((p) => p.slug);
  return (
    <section className="flex h-full w-full flex-col justify-center gap-8">
      <p>Slug: #{slug}</p>
    </section>
  );
}
