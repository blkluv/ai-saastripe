import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) return new NextResponse("Login is reqiured", { status: 401 });

  await prismadb.userSubscription.update({
    where: {
      userId: userId!,
    },
    data: {
      subscription: true,
    },
  });

  return NextResponse.json({ ok: true });
}
