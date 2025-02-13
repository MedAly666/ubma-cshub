// Create super user
import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import "dotenv/config";

const client = new PrismaClient();
async function createSuperUser() {
  try {
    // check if superuser already exists
    const superUser = await client.user.findFirst({
      where: { role: UserRole.SUPERUSER },
    });
    if (superUser) {
      console.log("superuser already exists");
      return;
    }

    // creating superuser
    const password = process.env.ADMIN_PASS;
    console.log(password);
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    const data = {
      username: process.env.ADMIN_USER,
      email: `${process.env.ADMIN_USER}@ubma-cshub.com`,
      password: hash,
      role: UserRole.SUPERUSER,
    };
    const user = await client.user.create({ data });
    console.log("superuser created succesfully: ", user);
  } catch (error) {
    console.log("Failed to create superuser: ", error);
  } finally {
    await client.$disconnect();
  }
}
createSuperUser();
