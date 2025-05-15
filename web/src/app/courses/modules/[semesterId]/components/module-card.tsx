import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Module } from "@/types/db";

interface ModuleCardProps {
  module: Module;
}
export default function ModuleCard({ module }: ModuleCardProps) {
  return (
    <Card
      key={module.id}
      className="cursor-pointer hover:shadow-md transition-all border-2 hover:border-primary/20"
    >
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          <div className="mt-1 p-2 rounded-md bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl">{module.name}</CardTitle>
            <CardDescription className="mt-2 text-sm">
              {module.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="pt-4 pb-4 border-t">
        <div className="flex justify-between items-center w-full">
          {/*   <p className="text-sm font-medium">
            {module.resourceCount} resources
          </p> */}
          <Button variant="ghost" size="sm" className="text-primary">
            View Module →
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
