"use client";

import { useAppwriteClient } from "@/lib/client/appwrite";
import { RealtimeResponseEvent } from "appwrite";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useEffect, useState } from "react";

/*
 * POC of how one would use appwrite's Realtime, do not commit
 */
export default function Test({ session }: { session: RequestCookie }) {
  const [a, b] = useState<
    RealtimeResponseEvent<{
      name: string;
    }>[]
  >([]);
  const client = useAppwriteClient(session);

  useEffect(() => {
    if (!client) return;
    const unsubscribe = client.client.subscribe<{ name: string }>(
      "documents",
      (response) => {
        b((p) => [...p, response]);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [session, client]);

  return (
    <div>
      <h3>Account events</h3>
      {a.map((e, i) => (
        <h4 key={i}>{JSON.stringify(e.payload.name)}</h4>
      ))}
    </div>
  );
}
