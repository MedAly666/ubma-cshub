import { findAdmins } from "@/services/admins";
import TypographyH3 from "@/components/typography/h3";
import CreateAdminDialog from "./components/create-dialog";
import AdminsTable from "./components/admins-table";

export default async function Admins() {
  const admins = await findAdmins();
  return (
    <div>
      <div className="mb-4 flex justify-between">
        <TypographyH3>Admins</TypographyH3>
        <CreateAdminDialog />
      </div>
      <AdminsTable admins={admins} />
    </div>
  );
}
