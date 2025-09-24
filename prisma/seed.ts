import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      clerkId: "dev_clerk_alice",
      username: "alice",
      fullName: "Alice Dev",
      email: "alice@example.com",
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@example.com" },
    update: {},
    create: {
      clerkId: "dev_clerk_bob",
      username: "bob",
      fullName: "Bob Dev",
      email: "bob@example.com",
    },
  });

  const ws = await prisma.workspace.create({
    data: {
      name: "Flowmate Dev",
      slug: "flowmate-dev",
      ownerId: alice.id,
      members: { create: [{ userId: alice.id, role: "OWNER" }, { userId: bob.id, role: "MEMBER" }] },
      projects: { create: [{ name: "MVP", description: "MVP project" }] },
    },
    include: { projects: true },
  });

  const project = ws.projects[0];

  const t1 = await prisma.task.create({
    data: { title: "Draft landing", description: "create landing", workspaceId: ws.id, projectId: project.id, assigneeId: alice.id },
  });

  await prisma.comment.create({
    data: { content: "Let's begin", taskId: t1.id, authorId: alice.id },
  });

  console.log("Seed finished");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
