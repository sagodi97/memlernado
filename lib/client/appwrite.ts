"use client";

import { Client, Databases, Account } from "appwrite";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useEffect, useState } from "react";

// Configuration function for the Appwrite client
function configureClient(sessionValue: string): Client {
  const client = new Client();
  client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setSession(sessionValue);
  return client;
}

// Factory function to create a web session client
function createWebSessionClient(session: RequestCookie) {
  if (!session?.value) return null;

  const client = configureClient(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get client() {
      return client;
    },
  };
}

type TAppWriteWebClient = {
  account: Account;
  databases: Databases;
  client: Client;
};

export function useAppwriteClient(session: RequestCookie) {
  const [client, setClient] = useState<TAppWriteWebClient>();

  useEffect(() => {
    if (!session?.value || client) return;
    const createdClient = createWebSessionClient(session);
    if (createdClient) {
      setClient(createdClient);
    }
  }, [session, client]);

  return client;
}
