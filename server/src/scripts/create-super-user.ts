import prisma from "../utils/db";
import readline from "readline/promises";
import { stdin, stdout } from "process";
import "dotenv/config";
import { hashPassword } from "../utils/password";
import { CreateUser } from "../dtos/users";

const validateUsername = (username: string) => {
  if (username.length === 0) {
    return [false, "Username empty!!"];
  }
  return [true, null];
};
const validatePassword = (password: string) => {
  if (password.length < 8) {
    return [false, "Password less than 8 chars!!"];
  }
  return [true, null];
};

const createSuperUser = async () => {
  try {
    const rl = readline.createInterface({ input: stdin, output: stdout });
    let username = process.env.DEFAULT_SUPER_USERNAME as string;
    let password = process.env.DEFAULT_SUPER_PASSWORD as string;
    let customCredential: string;

    // wether you want custom credentials or just stick with the default ones
    do {
      customCredential = await rl.question(
        "Do you want custom credentials for your super user? "
      );
      if (
        customCredential.toLowerCase() != "y" &&
        customCredential.toLowerCase() != "n"
      ) {
        console.log("Please enter the right options!!");
      }
    } while (
      customCredential.toLowerCase() != "y" &&
      customCredential.toLowerCase() != "n"
    );

    // choosing the username and the password
    switch (customCredential.toLowerCase()) {
      case "y":
        do {
          const errorMessages = [];
          username = await rl.question("Enter the username: ");
          let validationResult = validateUsername(username);
          if (!validationResult[0]) {
            errorMessages.push(validationResult[1]);
          }

          password = await rl.question("Enter the password: ");
          validationResult = validatePassword(password);
          if (!validationResult[0]) {
            errorMessages.push(validationResult[1]);
          }

          for (let message of errorMessages) {
            console.log(message);
          }
        } while (
          !validatePassword(password)[0] ||
          !validateUsername(username)[0]
        );
        break;
      default:
    }

    // checking if there is already a super user or not
    const superUser = await prisma.user.findFirst({
      where: { role: "SUPERUSER" },
    });
    if (superUser) {
      throw new Error("Only one superuser can be created!!!");
    }

    // creating the superuser
    // hashing the password
    password = await hashPassword(password);
    const superUserInfo: CreateUser = {
      username,
      password,
      email: "superuser@cshub.local",
      role: "SUPERUSER",
    };
    const newSuperUser = await prisma.user.create({ data: superUserInfo });
    console.log("Super user created!!!");
    console.log("Credentials: ");
    console.log(`username : ${newSuperUser.username}`);
    console.log(`password : ${newSuperUser.password}`);
    console.log(`email : ${newSuperUser.email}`);

    rl.close();
  } catch (error) {}
};

createSuperUser();
