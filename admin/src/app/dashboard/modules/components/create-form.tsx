"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Year, Degree, Semester, Major } from "@/types/db";
import {
  useActionState,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { Button } from "@/components/ui/button";
import { createModule } from "../actions";
import TypographyMuted from "@/components/typography/muted";

interface CreateModuleFormProps {
  years: Year[];
  degrees: Degree[];
  semesters: Semester[];
  majors: Major[];
  setCreateDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CreateModuleForm({
  years,
  degrees,
  majors,
  semesters,
  setCreateDialogOpen,
}: CreateModuleFormProps) {
  const [selectedDegree, setSelectedDegree] = useState<undefined | string>(
    undefined
  );

  const [selectedYear, setSelectedYear] = useState<undefined | string>(
    undefined
  );
  const [selectedSemester, setSelectedSemester] = useState<undefined | string>(
    undefined
  );
  const [selectedMajor, setSelectedMajor] = useState<undefined | string>(
    undefined
  );

  const [state, createModuleAction, isPending] = useActionState(createModule, {
    success: false,
  });
  const selectedDegreeMajors = majors.filter(
    (major) => major.degreeId === selectedDegree
  );
  const selectedMajorYears = years.filter(
    (year) => year.majorId === selectedMajor
  );
  const selectedYearSemesters = semesters.filter(
    (semester) => semester.yearId === selectedYear
  );

  useEffect(() => {
    if (state.success) setCreateDialogOpen(false);
  }, [state.success, setCreateDialogOpen]);

  return (
    <form action={createModuleAction} className="flex gap-4 flex-col">
      {/* NAME */}
      <div>
        <Label htmlFor="name">Name</Label>
        <Input name="name" type="text" />
        {state.fieldErrors?.name && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.name}
          </TypographyMuted>
        )}
      </div>
      {/* CODE */}
      <div>
        <Label htmlFor="code">Code</Label>
        <Input name="code" type="text" />
        {state.fieldErrors?.code && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.code}
          </TypographyMuted>
        )}
      </div>
      {/* DESCRIPTION */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" />
        {state.fieldErrors?.description && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.description}
          </TypographyMuted>
        )}
      </div>
      {/* DEGREE TYPE */}
      <div>
        <Select
          name="degreeId"
          value={selectedDegree}
          onValueChange={(value) => {
            setSelectedDegree(value);
            setSelectedYear(undefined);
            setSelectedMajor(undefined);
            setSelectedSemester(undefined);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Degrees" />
          </SelectTrigger>
          <SelectContent>
            {degrees.map((degree) => {
              return (
                <SelectItem key={degree.id} value={degree.id}>
                  {degree.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      {/* MAJOR TYPE */}
      <div>
        <Select
          name="majorId"
          disabled={!selectedDegree || selectedDegreeMajors.length === 0}
          value={selectedMajor}
          onValueChange={(value) => {
            setSelectedMajor(value);
            setSelectedYear(undefined);
            setSelectedSemester(undefined);
          }}
        >
          <SelectTrigger className="w-[180px]">
            {selectedYear ? <SelectValue /> : "Majors"}
          </SelectTrigger>
          <SelectContent>
            {selectedDegreeMajors.map((major) => {
              return (
                <SelectItem key={major.id} value={major.id}>
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
          disabled={!selectedMajor || selectedMajorYears.length === 0}
          value={selectedYear}
          onValueChange={(value) => {
            setSelectedYear(value);
            setSelectedSemester(undefined);
          }}
        >
          <SelectTrigger className="w-[180px]">
            {selectedYear ? <SelectValue /> : "Years"}
          </SelectTrigger>
          <SelectContent>
            {selectedMajorYears.map((year) => {
              return (
                <SelectItem key={year.id} value={year.id}>
                  {year.yearNumber}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      {/* SEMESTER NUMBER */}
      <div>
        <Select
          name="semesterId"
          disabled={!selectedYear || selectedYearSemesters.length === 0}
          value={selectedSemester}
          onValueChange={(value) => setSelectedSemester(value)}
        >
          <SelectTrigger className="w-[180px]">
            {selectedSemester ? <SelectValue /> : "Semesters"}
          </SelectTrigger>
          <SelectContent>
            {selectedYearSemesters.map((semester) => {
              return (
                <SelectItem key={semester.id} value={semester.id}>
                  {semester.semesterNumber}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {state.fieldErrors?.semesterId && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.semesterId}
          </TypographyMuted>
        )}
      </div>
      {/* SUBMIT */}
      <Button disabled={isPending}>
        {isPending ? "Creating...." : "Create"}
      </Button>
    </form>
  );
}
