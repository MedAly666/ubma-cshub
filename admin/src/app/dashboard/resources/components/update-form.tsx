"use client";
import { updateResource } from "../actions";
import { Semester, Year, Degree, Module, Major, Resource } from "@/types/db";
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

interface UpdateResourceFormProps {
  resource: Resource;
  modules: Module[];
  setIsUpdateDialogOpen: Dispatch<SetStateAction<boolean>>;
  years: Year[];
  majors: Major[];
  semesters: Semester[];
  degrees: Degree[];
}
export default function UpdateResourceForm({
  resource,
  setIsUpdateDialogOpen,
  years,
  degrees,
  majors,
  semesters,
  modules,
}: UpdateResourceFormProps) {
  const [selectedDegree, setSelectedDegree] = useState<undefined | string>(
    resource.module.semester.year.major.degree.id
  );

  const [selectedYear, setSelectedYear] = useState<undefined | string>(
    resource.module.semester.year.id
  );
  const [selectedSemester, setSelectedSemester] = useState<undefined | string>(
    resource.module.semester.id
  );
  const [selectedMajor, setSelectedMajor] = useState<undefined | string>(
    resource.module.semester.year.major.id
  );
  const [selectedModule, setSelectedModule] = useState<undefined | string>(
    resource.module.id
  );

  const [state, updateResourceAction, isPending] = useActionState(
    updateResource,
    {
      success: false,
    }
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
  const selectedSemesterModules = modules.filter(
    (module) => module.semesterId === selectedSemester
  );

  useEffect(() => {
    if (state.success) setIsUpdateDialogOpen(false);
  }, [state.success, setIsUpdateDialogOpen]);

  return (
    <form
      action={updateResourceAction}
      className="space-y-4 flex flex-col gap-4"
    >
      {/* URL */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="url" className="font-semibold">
          URL
        </Label>
        <Input name="url" type="text" defaultValue={resource.url} />
        {state.fieldErrors?.url && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.url}
          </TypographyMuted>
        )}
      </div>
      {/* DESCRIPTION */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="description" className="font-semibold">
          Description
        </Label>
        <Textarea name="description" defaultValue={resource.description} />
        {state.fieldErrors?.description && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.description}
          </TypographyMuted>
        )}
      </div>
      {/* TYPE */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="resourceType" className="font-semibold">
          Type
        </Label>
        <Select name="resourceType" defaultValue={resource.resourceType}>
          <SelectTrigger className="">
            <SelectValue placeholder="Select resource type" />
          </SelectTrigger>
          <SelectContent>
            {["Youtube", "Book", "Drive", "Website"].map((resource, index) => {
              return (
                <SelectItem key={index} value={resource.toUpperCase()}>
                  {resource}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        {state.fieldErrors?.resourceType && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.resourceType}
          </TypographyMuted>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DEGREE TYPE */}
        <div className="flex flex-col gap-2">
          <Label className="font-semibold">Degree</Label>
          <Select
            name="degreeId"
            value={selectedDegree}
            onValueChange={(value) => {
              setSelectedDegree(value);
              setSelectedYear(undefined);
              setSelectedMajor(undefined);
              setSelectedSemester(undefined);
              setSelectedModule(undefined);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select the degree" />
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
        <div className="flex flex-col gap-2">
          <Label className="font-semibold">Major</Label>
          <Select
            name="majorId"
            disabled={!selectedDegree || selectedDegreeMajors.length === 0}
            value={selectedMajor}
            onValueChange={(value) => {
              setSelectedMajor(value);
              setSelectedYear(undefined);
              setSelectedSemester(undefined);
              setSelectedModule(undefined);
            }}
          >
            <SelectTrigger>
              {selectedMajor ? <SelectValue /> : "Select the major"}
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
        <div className="flex flex-col gap-2">
          <Label className="font-semibold">Year</Label>
          <Select
            name="yearId"
            disabled={!selectedMajor || selectedMajorYears.length === 0}
            value={selectedYear}
            onValueChange={(value) => {
              setSelectedYear(value);
              setSelectedSemester(undefined);
              setSelectedModule(undefined);
            }}
          >
            <SelectTrigger>
              {selectedYear ? <SelectValue /> : "Select the year"}
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
        <div className="flex flex-col gap-2">
          <Label className="font-semibold">Semester</Label>
          <Select
            name="semesterId"
            disabled={!selectedYear || selectedYearSemesters.length === 0}
            value={selectedSemester}
            onValueChange={(value) => {
              setSelectedSemester(value);
              setSelectedModule(undefined);
            }}
          >
            <SelectTrigger>
              {selectedSemester ? <SelectValue /> : "Select the semester"}
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
        </div>
        <div className="flex flex-col gap-2">
          <Label className="font-semibold">Module</Label>
          <Select
            name="moduleId"
            disabled={!selectedSemester || selectedSemesterModules.length === 0}
            value={selectedModule}
            onValueChange={(value) => setSelectedModule(value)}
          >
            <SelectTrigger>
              {selectedModule ? <SelectValue /> : "Select the module"}
            </SelectTrigger>
            <SelectContent>
              {selectedSemesterModules.map((module) => {
                return (
                  <SelectItem key={module.id} value={module.id}>
                    {module.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {state.fieldErrors?.moduleId && (
            <TypographyMuted className="text-red-500">
              {state.fieldErrors.moduleId}
            </TypographyMuted>
          )}
        </div>
      </div>
      {/* RESOURCE ID */}
      <Input
        className="hidden"
        readOnly
        name="resourceId"
        value={resource.id}
      />
      {/* SUBMIT */}
      <Button disabled={isPending}>
        {isPending ? "Updating...." : "Update Resource"}
      </Button>
    </form>
  );
}
