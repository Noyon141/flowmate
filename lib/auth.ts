import { auth } from "@clerk/nextjs/server";

export async function getUserAuth() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return userId;
}
