import { redirect } from "next/navigation";

export default function Home() {
  redirect("/general");
  return (
    <div>
      <h1>Checklist App</h1>
    </div>
  );
}
