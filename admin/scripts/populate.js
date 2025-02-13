import { PrismaClient } from "@prisma/client";
import fs from "fs/promises";
const client = new PrismaClient();

async function populateDegrees() {
  try {
    const degreeData = await fs.readFile("./data/degrees.json");
    const degrees = await JSON.parse(degreeData);
    await client.degree.createMany({ data: degrees });
    console.log("Degrees Inserted Succefully");
  } catch (error) {
    console.log(error);
  }
}
async function populateMajors() {
  try {
    const degrees = await client.degree.findMany({});
    const bachelorId = degrees.find((degree) => degree.name === "Bachelor").id;
    const mastersId = degrees.find((degree) => degree.name === "Masters").id;
    const majorsData = await fs.readFile("./data/majors.json");
    const majorsJSON = JSON.parse(majorsData);
    const majors = majorsJSON.map((major) => {
      if (major.degree === "Bachelor") {
        return {
          name: major.name,
          description: major.description,
          code: major.code,
          degreeId: bachelorId,
        };
      }
      return {
        name: major.name,
        description: major.description,
        code: major.code,
        degreeId: mastersId,
      };
    });
    await client.major.createMany({ data: majors });
    console.log("Majors Inserted Succefully");
  } catch (error) {
    console.log(error);
  }
}

async function populateYears() {
  try {
    const degrees = await client.degree.findMany({});
    const bachelor = degrees.find((degree) => degree.name === "Bachelor");
    const masters = degrees.find((degree) => degree.name === "Masters");
    const bachelorMajors = await client.major.findMany({
      where: { degreeId: bachelor.id },
    });
    const mastersMajors = await client.major.findMany({
      where: {
        degreeId: masters.id,
      },
    });
    const bachelorYears = bachelorMajors
      .map((major) => {
        const years = [1, 2, 3];
        return years.map((year) => {
          return { yearNumber: year, majorId: major.id };
        });
      })
      .flat();
    const mastersYears = mastersMajors
      .map((major) => {
        const years = [1, 2];
        return years.map((year) => {
          return { yearNumber: year, majorId: major.id };
        });
      })
      .flat();

    const years = [...bachelorYears, ...mastersYears];
    await client.year.createMany({ data: years });
    console.log("Years create successfully");
  } catch (error) {
    console.log("An error occured while creating years");
  }
}

async function populateSemesters() {
  try {
    const years = await client.year.findMany({});
    const semestersData = years
      .map((year) => {
        const semesters = [1, 2];
        return semesters.map((semester) => {
          return { semesterNumber: semester, yearId: year.id };
        });
      })
      .flat();
    await client.semester.createMany({ data: semestersData });
    console.log("Semesters created successfully");
  } catch (error) {
    console.log("An error occured while creating semesters");
  }
}

async function populateModules() {
  try {
    const semesters = await client.semester.findMany({
      include: { year: { include: { major: { include: { degree: true } } } } },
    });
    const modulesBuffer = await fs.readFile("./data/modules.json");
    const mSemesterJSON = await JSON.parse(modulesBuffer);
    const modulesData = mSemesterJSON
      .map((mSem) => {
        const semester = semesters.find(
          (semester) =>
            semester.semesterNumber === mSem.semester &&
            semester.year.yearNumber === mSem.year &&
            semester.year.major.code === mSem.code
        );
        return mSem.modules.map((mdl) => {
          return { ...mdl, semesterId: semester.id };
        });
      })
      .flat();
    await client.module.createMany({ data: modulesData });
    console.log("Modules Created Successfully");
  } catch (error) {
    console.log("Failed to create modules");
  }
}

populateModules();
