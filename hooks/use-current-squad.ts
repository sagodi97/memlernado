"use client";

import { useParams } from "next/navigation";

export function useCurrentSquad() {
  const params = useParams();
  return params.squadId as string | undefined;
}
