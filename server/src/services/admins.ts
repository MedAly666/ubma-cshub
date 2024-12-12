import prisma from "../utils/db";

export async function findAdmins() {
  const user = await prisma.user.findMany({
    where: { role: { in: ["ADMIN"] } },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      role: true,
    },
  });
  return user;
}
