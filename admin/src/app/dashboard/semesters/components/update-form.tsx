"use client";

import { updateSemester } from "../actions";
import { Semester, Year, Degree, Major } from "@/types/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface UpdateSemesterProps {
  semester: Semester;
  setIsUpdateDialogOpen: Dispatch<SetStateAction<boolean>>;
  years: Year[];
  degrees: Degree[];
  majors: Major[];
}
export default function UpdateSemesterForm({
  semester,
  setIsUpdateDialogOpen,
  years,
  majors,
  degrees,
}: UpdateSemesterProps) {
  const [state, updateSemesterAction, isPending] = useActionState(
    updateSemester,
    {
      success: false,
    }
  );
  const [selectedDegree, setSelectedDegree] = useState(
    semester.year.major.degreeId
  );
  const [selectedYear, setSelectedYear] = useState<string | undefined>(
    semester.yearId
  );
  const [selectedMajor, setSelectedMajor] = useState<string | undefined>(
    semester.year.majorId
  );

  const selectedDegreeMajors = majors.filter(
    (major) => major.degreeId === selectedDegree
  );

  const selectedMajorYears = years.filter(
    (year) => year.majorId === selectedMajor
  );

  useEffect(() => {
    if (state.success) {
      setIsUpdateDialogOpen(false);
    }
  }, [state.success, setIsUpdateDialogOpen]);

  return (
    <form className="flex flex-col gap-5" action={updateSemesterAction}>
      {/* SEMESTER NUMBER */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="semesterNumber">Semester Number</Label>
        <Input
          type="number"
          name="semesterNumber"
          defaultValue={semester.semesterNumber}
        />
        {state.fieldErrors?.semesterNumber && (
          <p className="text-red-500">{state.fieldErrors.semesterNumber}</p>
        )}
      </div>
      {/* DEGREE TYPE */}
      <div>
        <Select
          name="degreeId"
          defaultValue={selectedDegree}
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
      {/* MAJOR TYPE */}
      <div>
        <Select
          name="majorId"
          value={selectedMajor}
          onValueChange={(value) => setSelectedMajor(value)}
          disabled={!selectedDegree || selectedDegreeMajors.length === 0}
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
          disabled={!selectedMajor || selectedMajorYears.length === 0}
        >
          <SelectTrigger className="w-[180px]">
            {selectedYear ? <SelectValue /> : "Years"}
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
        {state.fieldErrors?.yearId && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.yearId}
          </TypographyMuted>
        )}
      </div>

      <Input
        className="hidden"
        readOnly
        name="semesterId"
        value={semester.id}
      />
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
