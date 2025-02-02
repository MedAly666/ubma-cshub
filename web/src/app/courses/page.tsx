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
  return (
    <div className="container mx-auto px-8 min-h-[80vh] flex space-y-5 flex-col items-start">
      <TypographyH1 className="mt-5">Find Your Course Resources</TypographyH1>
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
      </div>
      <Button className="font-semibold">Search</Button>
    </div>
  );
}
