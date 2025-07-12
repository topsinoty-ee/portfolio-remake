import { Form } from "./form";

export default async function AddProjectPage() {
  return (
    <div className="bg-card border-border container mx-auto flex h-full w-full flex-col justify-center gap-10 rounded-md border p-4 shadow">
      <h1 className="text-3xl font-bold">Add new project</h1>
      <Form />
    </div>
  );
}
