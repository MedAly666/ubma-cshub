"use client";
import { TypographyH1 } from "@/components/typography/h1";
import { TypographyH2 } from "@/components/typography/h2";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";

const degrees = ["Bachelor", "Masters"];
const majors = [
  { name: "Artificial Intelligence", degree: "Masters" },
  { name: "Computer Systems", degree: "Bachelor" },
  { name: "Cybersecurity", degree: "Masters" },
  { name: "Software Engineering", degree: "Bachelor" },
  { name: "Data Science", degree: "Masters" },
  { name: "Computer Networks", degree: "Bachelor" },
  { name: "Machine Learning", degree: "Masters" },
  { name: "Embedded Systems", degree: "Bachelor" },
  { name: "Human-Computer Interaction", degree: "Masters" },
  { name: "Cloud Computing", degree: "Masters" },
  { name: "Computational Mathematics", degree: "Bachelor" },
  { name: "Quantum Computing", degree: "Masters" },
];
const years = [
  { major: "Artificial Intelligence", degree: "Masters", number: 1 },
  { major: "Artificial Intelligence", degree: "Masters", number: 2 },
  { major: "Computer Systems", degree: "Bachelor", number: 1 },
  { major: "Computer Systems", degree: "Bachelor", number: 2 },
  { major: "Computer Systems", degree: "Bachelor", number: 3 },
  { major: "Cybersecurity", degree: "Masters", number: 1 },
  { major: "Cybersecurity", degree: "Masters", number: 2 },
  { major: "Software Engineering", degree: "Bachelor", number: 1 },
  { major: "Software Engineering", degree: "Bachelor", number: 2 },
  { major: "Software Engineering", degree: "Bachelor", number: 3 },
  { major: "Data Science", degree: "Masters", number: 1 },
  { major: "Data Science", degree: "Masters", number: 2 },
  { major: "Computer Networks", degree: "Bachelor", number: 1 },
  { major: "Computer Networks", degree: "Bachelor", number: 2 },
  { major: "Computer Networks", degree: "Bachelor", number: 3 },
  { major: "Machine Learning", degree: "Masters", number: 1 },
  { major: "Machine Learning", degree: "Masters", number: 2 },
  { major: "Embedded Systems", degree: "Bachelor", number: 1 },
  { major: "Embedded Systems", degree: "Bachelor", number: 2 },
  { major: "Embedded Systems", degree: "Bachelor", number: 3 },
  { major: "Human-Computer Interaction", degree: "Masters", number: 1 },
  { major: "Human-Computer Interaction", degree: "Masters", number: 2 },
  { major: "Cloud Computing", degree: "Masters", number: 1 },
  { major: "Cloud Computing", degree: "Masters", number: 2 },
  { major: "Computational Mathematics", degree: "Bachelor", number: 1 },
  { major: "Computational Mathematics", degree: "Bachelor", number: 2 },
  { major: "Computational Mathematics", degree: "Bachelor", number: 3 },
  { major: "Quantum Computing", degree: "Masters", number: 1 },
  { major: "Quantum Computing", degree: "Masters", number: 2 },
];

const semesters = [
  { major: "Artificial Intelligence", degree: "Masters", year: 1, number: 1 },
  { major: "Artificial Intelligence", degree: "Masters", year: 1, number: 2 },
  { major: "Artificial Intelligence", degree: "Masters", year: 2, number: 1 },
  { major: "Artificial Intelligence", degree: "Masters", year: 2, number: 2 },

  { major: "Computer Systems", degree: "Bachelor", year: 1, number: 1 },
  { major: "Computer Systems", degree: "Bachelor", year: 1, number: 2 },
  { major: "Computer Systems", degree: "Bachelor", year: 2, number: 1 },
  { major: "Computer Systems", degree: "Bachelor", year: 2, number: 2 },
  { major: "Computer Systems", degree: "Bachelor", year: 3, number: 1 },
  { major: "Computer Systems", degree: "Bachelor", year: 3, number: 2 },

  { major: "Cybersecurity", degree: "Masters", year: 1, number: 1 },
  { major: "Cybersecurity", degree: "Masters", year: 1, number: 2 },
  { major: "Cybersecurity", degree: "Masters", year: 2, number: 1 },
  { major: "Cybersecurity", degree: "Masters", year: 2, number: 2 },

  { major: "Software Engineering", degree: "Bachelor", year: 1, number: 1 },
  { major: "Software Engineering", degree: "Bachelor", year: 1, number: 2 },
  { major: "Software Engineering", degree: "Bachelor", year: 2, number: 1 },
  { major: "Software Engineering", degree: "Bachelor", year: 2, number: 2 },
  { major: "Software Engineering", degree: "Bachelor", year: 3, number: 1 },
  { major: "Software Engineering", degree: "Bachelor", year: 3, number: 2 },

  { major: "Data Science", degree: "Masters", year: 1, number: 1 },
  { major: "Data Science", degree: "Masters", year: 1, number: 2 },
  { major: "Data Science", degree: "Masters", year: 2, number: 1 },
  { major: "Data Science", degree: "Masters", year: 2, number: 2 },

  { major: "Computer Networks", degree: "Bachelor", year: 1, number: 1 },
  { major: "Computer Networks", degree: "Bachelor", year: 1, number: 2 },
  { major: "Computer Networks", degree: "Bachelor", year: 2, number: 1 },
  { major: "Computer Networks", degree: "Bachelor", year: 2, number: 2 },
  { major: "Computer Networks", degree: "Bachelor", year: 3, number: 1 },
  { major: "Computer Networks", degree: "Bachelor", year: 3, number: 2 },

  { major: "Machine Learning", degree: "Masters", year: 1, number: 1 },
  { major: "Machine Learning", degree: "Masters", year: 1, number: 2 },
  { major: "Machine Learning", degree: "Masters", year: 2, number: 1 },
  { major: "Machine Learning", degree: "Masters", year: 2, number: 2 },

  { major: "Embedded Systems", degree: "Bachelor", year: 1, number: 1 },
  { major: "Embedded Systems", degree: "Bachelor", year: 1, number: 2 },
  { major: "Embedded Systems", degree: "Bachelor", year: 2, number: 1 },
  { major: "Embedded Systems", degree: "Bachelor", year: 2, number: 2 },
  { major: "Embedded Systems", degree: "Bachelor", year: 3, number: 1 },
  { major: "Embedded Systems", degree: "Bachelor", year: 3, number: 2 },

  {
    major: "Human-Computer Interaction",
    degree: "Masters",
    year: 1,
    number: 1,
  },
  {
    major: "Human-Computer Interaction",
    degree: "Masters",
    year: 1,
    number: 2,
  },
  {
    major: "Human-Computer Interaction",
    degree: "Masters",
    year: 2,
    number: 1,
  },
  {
    major: "Human-Computer Interaction",
    degree: "Masters",
    year: 2,
    number: 2,
  },

  { major: "Cloud Computing", degree: "Masters", year: 1, number: 1 },
  { major: "Cloud Computing", degree: "Masters", year: 1, number: 2 },
  { major: "Cloud Computing", degree: "Masters", year: 2, number: 1 },
  { major: "Cloud Computing", degree: "Masters", year: 2, number: 2 },

  {
    major: "Computational Mathematics",
    degree: "Bachelor",
    year: 1,
    number: 1,
  },
  {
    major: "Computational Mathematics",
    degree: "Bachelor",
    year: 1,
    number: 2,
  },
  {
    major: "Computational Mathematics",
    degree: "Bachelor",
    year: 2,
    number: 1,
  },
  {
    major: "Computational Mathematics",
    degree: "Bachelor",
    year: 2,
    number: 2,
  },
  {
    major: "Computational Mathematics",
    degree: "Bachelor",
    year: 3,
    number: 1,
  },
  {
    major: "Computational Mathematics",
    degree: "Bachelor",
    year: 3,
    number: 2,
  },

  { major: "Quantum Computing", degree: "Masters", year: 1, number: 1 },
  { major: "Quantum Computing", degree: "Masters", year: 1, number: 2 },
  { major: "Quantum Computing", degree: "Masters", year: 2, number: 1 },
  { major: "Quantum Computing", degree: "Masters", year: 2, number: 2 },
];

function numberToText(num: number) {
  const text = [
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eighth",
    "Ninth",
    "Tenth",
  ];
  return text[num - 1];
}
export default function Courses() {
  const [selectedDegree, setSelectedDegree] = useState({
    isSelected: false,
    degree: "",
  });
  const [selectedMajor, setSelectedMajor] = useState({
    isSelected: false,
    major: {
      degree: "",
      name: "",
    },
  });
  const [selectedYear, setSelectedYear] = useState({
    isSelected: false,
    year: { number: 0, degree: "", major: "" },
  });
  const [selectedSemester, setSelectedSemester] = useState({
    isSelected: false,
    semester: { number: 0, degree: "", major: "", year: 0 },
  });
  return (
    <div className="container mx-auto px-8 min-h-[80vh] flex space-y-5 flex-col items-start py-6">
      <TypographyH1>Find Your Course Resources</TypographyH1>
      <div className="space-y-5">
        {/* Select Degree */}
        <Card className="border border-secondary">
          <CardHeader>
            <TypographyH2>Select Your Degree</TypographyH2>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            {degrees.map((degree, idx) => (
              <Button
                key={idx}
                variant={
                  selectedDegree.isSelected && selectedDegree.degree === degree
                    ? "default"
                    : "outline"
                }
                className={`font-semibold`}
                onClick={() => setSelectedDegree({ isSelected: true, degree })}
              >
                {degree}
              </Button>
            ))}
          </CardContent>
        </Card>
        {/* Select Major */}
        {selectedDegree.isSelected && (
          <Card>
            <CardHeader>
              <TypographyH2>Select Your Major</TypographyH2>
            </CardHeader>
            <CardContent className="flex items-center gap-4 flex-wrap">
              {majors
                .filter((major) => major.degree === selectedDegree.degree)
                .map((major, idx) => (
                  <Button
                    key={idx}
                    variant={
                      selectedMajor.isSelected &&
                      selectedMajor.major.name === major.name
                        ? "default"
                        : "outline"
                    }
                    className={`font-semibold`}
                    onClick={() =>
                      setSelectedMajor({
                        isSelected: true,
                        major: { name: major.name, degree: major.degree },
                      })
                    }
                  >
                    {major.name}
                  </Button>
                ))}
            </CardContent>
          </Card>
        )}
        {/* Select Year */}
        {selectedMajor.isSelected && (
          <Card>
            <CardHeader>
              <TypographyH2>Select Your Year</TypographyH2>
            </CardHeader>
            <CardContent className="flex items-center gap-4 flex-wrap">
              {years
                .filter((year) => year.major === selectedMajor.major.name)
                .map((year, idx) => (
                  <Button
                    key={idx}
                    variant={
                      selectedYear.isSelected &&
                      selectedYear.year.number === year.number
                        ? "default"
                        : "outline"
                    }
                    className={`font-semibold`}
                    onClick={() =>
                      setSelectedYear({
                        isSelected: true,
                        year: {
                          major: year.major,
                          number: year.number,
                          degree: year.degree,
                        },
                      })
                    }
                  >
                    {numberToText(year.number) + " Year"}
                  </Button>
                ))}
            </CardContent>
          </Card>
        )}
        {/* Select Semester */}
        {selectedYear.isSelected && (
          <Card>
            <CardHeader>
              <TypographyH2>Select Your Semester</TypographyH2>
            </CardHeader>
            <CardContent className="flex items-center gap-4 flex-wrap">
              {semesters
                .filter(
                  (semester) =>
                    semester.major === selectedYear.year.major &&
                    semester.year === selectedYear.year.number
                )
                .map((semester, idx) => (
                  <Button
                    key={idx}
                    variant={
                      selectedSemester.isSelected &&
                      selectedSemester.semester.number === semester.number
                        ? "default"
                        : "outline"
                    }
                    className={`font-semibold`}
                    onClick={() =>
                      setSelectedSemester({
                        isSelected: true,
                        semester: {
                          major: semester.major,
                          number: semester.number,
                          degree: semester.degree,
                          year: semester.year,
                        },
                      })
                    }
                  >
                    {numberToText(semester.number) + " Semester"}
                  </Button>
                ))}
            </CardContent>
          </Card>
        )}
      </div>
      <Button className="font-semibold">Search</Button>
    </div>
  );
}
