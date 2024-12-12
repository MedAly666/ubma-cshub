"use client";

import { updateModule } from "../actions";
import { Semester, Year, Degree, Module, Major } from "@/types/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  useActionState,
  useEffect,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import TypographyMuted from "@/components/typography/muted";

interface UpdateModuleProps {
  module: Module;
  setIsUpdateDialogOpen: Dispatch<SetStateAction<boolean>>;
  years: Year[];
  majors: Major[];
  semesters: Semester[];
  degrees: Degree[];
}
export default function UpdateModuleForm({
  module,
  setIsUpdateDialogOpen,
  years,
  degrees,
  majors,
  semesters,
}: UpdateModuleProps) {
  const [state, updateModuleAction, isPending] = useActionState(updateModule, {
    success: false,
  });
  const [selectedDegree, setSelectedDegree] = useState(
    module.semester.year.major.degreeId
  );
  const [selectedMajor, setSelectedMajor] = useState<string | undefined>(
    module.semester.year.majorId
  );
  const [selectedYear, setSelectedYear] = useState<string | undefined>(
    module.semester.yearId
  );
  const [selectedSemester, setSelectedSemester] = useState<string | undefined>(
    module.semesterId
  );

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
    if (state.success) setIsUpdateDialogOpen(false);
  }, [state.success, setIsUpdateDialogOpen]);

  return (
    <form className="flex flex-col gap-5" action={updateModuleAction}>
      {/* NAME */}
      <div>
        <Label htmlFor="name">Name</Label>
        <Input name="name" type="text" defaultValue={module.name} />
        {state.fieldErrors?.name && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.name}
          </TypographyMuted>
        )}
      </div>
      {/* CODE */}
      <div>
        <Label htmlFor="code">Code</Label>
        <Input name="code" type="text" defaultValue={module.code} />
        {state.fieldErrors?.code && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.code}
          </TypographyMuted>
        )}
      </div>
      {/* DESCRIPTION */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" defaultValue={module.description} />
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
            setSelectedMajor(undefined);
            setSelectedYear(undefined);
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
            {selectedMajor ? <SelectValue /> : "Majors"}
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
      {/* MODULE ID */}
      <Input className="hidden" readOnly name="moduleId" value={module.id} />
      {/* SUBMIT */}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Updating..." : "Update"}
      </Button>
      {state.serverErrors && (
        <TypographyMuted className="text-red-500">
          {state.serverErrors}
        </TypographyMuted>
      )}
    </form>
  );
}
