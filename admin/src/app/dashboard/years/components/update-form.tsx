"use client";

import { updateYear } from "../actions";
import { Degree, Major, Year } from "@/types/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useEffect, useState } from "react";

interface UpdateYearProps {
  year: Year;
  degrees: Degree[];
  closeUpdateDialog: () => void;
  majors: Major[];
}
export default function UpdateYearForm({
  year,
  degrees,
  majors,
  closeUpdateDialog,
}: UpdateYearProps) {
  const [state, updateYearAction, isPending] = useActionState(updateYear, {
    success: false,
  });

  const [selectedDegree, setSelectedDegree] = useState<undefined | string>(
    year.major.degreeId
  );
  const [selectedMajor, setSelectedMajor] = useState<undefined | string>(
    year.majorId
  );

  const degreeMajors = majors.filter(
    (major) => major.degreeId === selectedDegree
  );

  useEffect(() => {
    if (state.success) closeUpdateDialog();
  }, [state.success, closeUpdateDialog]);

  return (
    <form className="flex flex-col gap-5" action={updateYearAction}>
      <div className="flex flex-col gap-3">
        <Label htmlFor="yearNumber">Year Number</Label>
        <Input type="number" name="yearNumber" defaultValue={year.yearNumber} />
        {state.fieldErrors?.yearNumber && (
          <p className="text-red-500">{state.fieldErrors.yearNumber}</p>
        )}
      </div>
      <div>
        <Select
          name="degreeId"
          defaultValue={selectedDegree}
          onValueChange={(value) => {
            setSelectedDegree(value);
            setSelectedMajor(undefined);
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
        {state.fieldErrors?.degreeId && (
          <p className="text-red-500">{state.fieldErrors.degreeId}</p>
        )}
      </div>
      <div>
        <Select
          name="majorId"
          defaultValue={selectedMajor}
          onValueChange={(value) => setSelectedMajor(value)}
        >
          <SelectTrigger className="w-[180px]">
            {selectedMajor ? <SelectValue /> : "Majors"}
          </SelectTrigger>
          <SelectContent>
            {degreeMajors.map((major) => {
              return (
                <SelectItem value={major.id} key={major.id}>
                  {major.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {state.fieldErrors?.degreeId && (
          <p className="text-red-500">{state.fieldErrors.degreeId}</p>
        )}
      </div>
      <Input className="hidden" readOnly name="yearId" value={year.id} />
      <Button type="submit" disabled={isPending}>
        {isPending ? "Updating..." : "Update"}
      </Button>
      {state.serverErrors && (
        <p className="text-red-500">{state.serverErrors}</p>
      )}
    </form>
  );
}
