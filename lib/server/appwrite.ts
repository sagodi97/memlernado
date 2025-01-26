"use server";
import { Client, Account, Teams, Users } from "node-appwrite";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "./const";
import { ETeamRole } from "../types";

export async function createEmptySessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setSession("");

  return {
    get account() {
      return new Account(client);
    },
    get teams() {
      return new Teams(client);
    },
  };
}

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

  const session = cookies().get(SESSION_COOKIE);
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get teams() {
      return new Teams(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get teams() {
      return new Teams(client);
    },
    get users() {
      return new Users(client);
    },
  };
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch {
    return null;
  }
}

export async function getUserTeams() {
  try {
    const { teams } = await createSessionClient();
    return teams.list();
  } catch {
    return null;
  }
}

export async function getTeamMembers(teamId: string) {
  try {
    const { teams } = await createSessionClient();
    return teams.listMemberships(teamId);
  } catch {
    return null;
  }
}

export async function getCurrentUserTeamRoles(
  teamId: string
): Promise<ETeamRole[] | null> {
  try {
    const { teams, account } = await createSessionClient();
    const { $id: userId } = await account.get();
    const { memberships } = await teams.listMemberships(teamId);
    return (
      (memberships.find((m) => m.userId === userId)?.roles as ETeamRole[]) ||
      null
    );
  } catch {
    return null;
  }
}
