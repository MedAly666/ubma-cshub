"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Degree, Major } from "@/types/db";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useEffect, useState } from "react";
import { createYear } from "../actions";

interface CreateFormProps {
  degrees: Degree[];
  majors: Major[];
  closeDialog: () => void;
}
export default function CreateYearForm({
  degrees,
  majors,
  closeDialog,
}: CreateFormProps) {
  const [state, createYearAction, isPending] = useActionState(createYear, {
    success: false,
  });
  const [selectedMajor, setSelectedMajor] = useState<string | undefined>(
    undefined
  );
  const [selectedDegree, setSelectedDegree] = useState<string | undefined>(
    undefined
  );

  const degreeMajors = majors.filter(
    (major) => major.degreeId === selectedDegree
  );

  useEffect(() => {
    if (state.success) closeDialog();
  }, [state.success, closeDialog]);

  return (
    <form className="flex flex-col gap-5" action={createYearAction}>
      <div className="flex flex-col gap-3">
        <Label htmlFor="yearNumber">Year Number</Label>
        <Input type="number" name="yearNumber" />
        {state?.fieldErrors?.yearNumber && (
          <p className="text-red-500">{state.fieldErrors.yearNumber}</p>
        )}
      </div>
      <div>
        <Select
          name="degreeId"
          onValueChange={(value) => {
            setSelectedDegree(value);
            setSelectedMajor(undefined);
          }}
          disabled={degrees.length === 0}
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
      <div>
        <Select
          name="majorId"
          disabled={degreeMajors.length === 0}
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
        {state?.fieldErrors?.majorId && (
          <p className="text-red-500">{state.fieldErrors.majorId}</p>
        )}
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create"}
      </Button>
      {state?.serverErrors && (
        <p className="text-red-500">{state.serverErrors}</p>
      )}
    </form>
  );
}
