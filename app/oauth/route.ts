import { oAuthService } from "@/lib/server/services/appwrite";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  const secret = request.nextUrl.searchParams.get("secret");

  if (!userId || !secret) {
    return new NextResponse("OAuth2 did not provide token", { status: 400 });
  }

  try {
    await oAuthService.createSessionFromOAuth(userId, secret);
    return NextResponse.redirect(`${request.nextUrl.origin}`);
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to create session from token", {
      status: 400,
    });
  }
}
