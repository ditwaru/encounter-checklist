import Content from "./Content";

export default async function Page({ params }: { params: Promise<{ team: string }> }) {
  const team = await params;
  return <Content params={team} />;
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`);
  const teams = await res.json();
  return teams.map((team: string) => ({
    team,
  }));
}
