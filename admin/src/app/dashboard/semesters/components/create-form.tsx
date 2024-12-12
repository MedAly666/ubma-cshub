"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Degree, Year, Major } from "@/types/db";
import { useActionState, useEffect, useState } from "react";
import { createSemester } from "../actions";
import { Button } from "@/components/ui/button";
import TypographyMuted from "@/components/typography/muted";

interface CreateSemesterFormProps {
  years: Year[];
  degrees: Degree[];
  majors: Major[];
  closeCreateDialog: () => void;
}

export default function CreateSemesterForm({
  years,
  closeCreateDialog,
  degrees,
  majors,
}: CreateSemesterFormProps) {
  const [state, createSemesterAction, isPending] = useActionState(
    createSemester,
    {
      success: false,
    }
  );
  const [selectedMajor, setSelectedMajor] = useState<string | undefined>(
    undefined
  );
  const [selectedDegree, setSelectedDegree] = useState<string | undefined>(
    undefined
  );
  const [selectedYear, setSelectedYear] = useState<string | undefined>(
    undefined
  );

  const selectedDegreeMajors = majors.filter(
    (major) => major.degreeId === selectedDegree
  );
  const selectedMajorYears = years.filter(
    (year) => year.majorId === selectedMajor
  );

  useEffect(() => {
    if (state.success) closeCreateDialog();
  }, [state.success, closeCreateDialog]);

  useEffect(() => {
    setSelectedYear(undefined);
  }, [selectedDegree]);

  return (
    <form className="flex flex-col gap-5" action={createSemesterAction}>
      <div className="flex flex-col gap-3">
        {/* SEMESTER NUMBER */}
        <Label htmlFor="semesterNumber">Semester Number</Label>
        <Input type="number" name="semesterNumber" />
        {state?.fieldErrors?.semesterNumber && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.semesterNumber}
          </TypographyMuted>
        )}
      </div>
      {/* DEGREE TYPE */}
      <div>
        <Select
          name="degreeId"
          onValueChange={(value) => {
            setSelectedDegree(value);
            setSelectedMajor(undefined);
            setSelectedYear(undefined);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Degrees" />
          </SelectTrigger>
          <SelectContent>
            {degrees.map((degree) => {
              return (
                <SelectItem value={degree.id} key={degree.id}>
                  {degree.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      {/* MAJOR ID */}
      <div>
        <Select
          name="majorId"
          value={selectedMajor}
          disabled={!selectedDegree || selectedDegreeMajors.length === 0}
          onValueChange={(value) => {
            setSelectedMajor(value);
            setSelectedYear(undefined);
          }}
        >
          <SelectTrigger className="w-[180px]">
            {!selectedMajor ? "Majors" : <SelectValue />}
          </SelectTrigger>
          <SelectContent>
            {selectedDegreeMajors.map((major) => {
              return (
                <SelectItem value={major.id} key={major.id}>
                  {major.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      {/* YEAR NUMBER */}
      <div>
        <Select
          name="yearId"
          value={selectedYear}
          onValueChange={(value) => setSelectedYear(value)}
          disabled={!selectedDegree || selectedMajorYears.length === 0}
        >
          <SelectTrigger className="w-[180px]">
            {!selectedYear ? "Years" : <SelectValue />}
          </SelectTrigger>
          <SelectContent>
            {selectedMajorYears.map((year) => {
              return (
                <SelectItem value={year.id} key={year.id}>
                  {year.yearNumber}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {state?.fieldErrors?.yearId && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.yearId}
          </TypographyMuted>
        )}
      </div>
      {/* SUBMIT */}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create"}
      </Button>
      {state?.serverErrors && (
        <TypographyMuted className="text-red-500">
          {state.serverErrors}
        </TypographyMuted>
      )}
    </form>
  );
}
