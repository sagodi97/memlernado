import { notFound } from "next/navigation";
import { squadService } from "@/lib/server/services/appwrite";

export default async function SquadPage({
  params,
}: {
  params: { squadId: string };
}) {
  console.log(params);
  const squad = await squadService.getSquad(params.squadId);

  if (!squad) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">{squad.name} Dashboard</h1>
    </div>
  );
}
