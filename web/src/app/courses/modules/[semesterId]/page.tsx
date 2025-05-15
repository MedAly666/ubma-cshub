import { getModulesBySemester } from "@/services/modules";
import ModuleCard from "./components/module-card";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ModulesProps {
  params: {
    semesterId: string;
  };
}

export default async function Modules({ params }: ModulesProps) {
  const { semesterId } = params;
  const modules = await getModulesBySemester(semesterId);

  return (
    <div className="min-h-screen mx-auto container pt-10 px-8">
      <Link href={"/courses"}>
        <Button variant="outline" className="mb-8 flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Selection
        </Button>
      </Link>

      <div className="space-y-4">
        {modules.map((module) => {
          return <ModuleCard module={module} key={module.id} />;
        })}
      </div>
    </div>
  );
}
