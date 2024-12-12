import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSideBar from "./components/dashboard-sidebar";
import DashboardNavBar from "./components/nav-bar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSideBar />
      <main className="w-full">
        <DashboardNavBar />
        <div className="container mx-auto px-8 py-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
