interface ModulesProps {
  params: {
    majorId: string;
    yearId: string;
  };
}

export default function Modules({ params }: ModulesProps) {
  const { majorId, yearId } = params;
  console.log(majorId);
  console.log(yearId);
  return (
    <div className="min-h-screen mx-auto container pt-10 px-8">
      Modules Page
    </div>
  );
}
