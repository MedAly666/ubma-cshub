"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Major, Year } from "@/types/db";
import { useState } from "react";
import Link from "next/link";

interface SelectCourseCardProps {
  majors: Major[];
  years: Year[];
}

export default function SelectCourseCard({
  majors,
  years,
}: SelectCourseCardProps) {
  const [selectedMajor, setSelectedMajor] = useState<string | undefined>(
    undefined
  );
  const [selectedYear, setSelectedYear] = useState<string | undefined>(
    undefined
  );

  const yearsFiltered = years.filter((year) => year.major.id === selectedMajor);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Find Your Resources</CardTitle>
        <CardDescription>
          Select your major and year to discover relevant modules and learning
          materials
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="major">Major</Label>
          <Select
            value={selectedMajor}
            onValueChange={(value) => setSelectedMajor(value)}
          >
            <SelectTrigger id="major">
              <SelectValue placeholder="Select your major" />
            </SelectTrigger>
            <SelectContent>
              {majors.map((major) => (
                <SelectItem key={major.id} value={major.id}>
                  {major.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Select
            value={selectedYear}
            onValueChange={setSelectedYear}
            disabled={!selectedMajor}
          >
            <SelectTrigger id="year">
              <SelectValue placeholder="Select your year" />
            </SelectTrigger>
            <SelectContent>
              {yearsFiltered.map((year) => (
                <SelectItem key={year.id} value={year.id}>
                  Year {year.year_number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`courses/modules/${selectedMajor}/${selectedYear}`}>
          <Button className="w-full" size="lg">
            Continue
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
