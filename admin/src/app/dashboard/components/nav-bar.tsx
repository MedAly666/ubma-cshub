"use client";
import TypographyH2 from "@/components/typography/h2";
import { useSidebar } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
export default function DashboardNavBar() {
  const sidebar = useSidebar();
  return (
    <div className="h-16 border-b-2 border">
      <div className="flex items-center container mx-auto px-8 gap-4 h-full">
        <SidebarTrigger />
        {!sidebar.open && (
          <TypographyH2 className="text-2xl lg:text-3xl">
            Ubma-Cshub
          </TypographyH2>
        )}
      </div>
    </div>
  );
}
