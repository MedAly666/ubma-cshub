import { User } from "@/types/db";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import { updateAdmin } from "../actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import TypographyMuted from "@/components/typography/muted";
interface UpdateAdminFormProps {
  admin: User;
  setIsUpdateDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateAdminForm({
  admin,
  setIsUpdateDialogOpen,
}: UpdateAdminFormProps) {
  const [state, updateAdminAction, isPending] = useActionState(updateAdmin, {
    success: false,
  });

  useEffect(() => {
    if (state.success) setIsUpdateDialogOpen(false);
  }, [state.success, setIsUpdateDialogOpen]);
  return (
    <form action={updateAdminAction} className="w-full flex flex-col gap-4">
      <div>
        <Label htmlFor="username">Username</Label>
        <Input name="username" defaultValue={admin.username} className="mb-2" />
        {state.fieldErrors?.username && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.username}
          </TypographyMuted>
        )}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input name="email" defaultValue={admin.email} className="mb-2" />
        {state.fieldErrors?.email && (
          <TypographyMuted className="text-red-500">
            {state.fieldErrors.email}
          </TypographyMuted>
        )}
      </div>
      <Input name="adminId" value={admin.id} readOnly className="hidden" />
      <div className="w-full">
        <Button disabled={isPending} className="w-full mb-2">
          {isPending ? "Updating..." : "Update"}
        </Button>
        {state.serverErrors && (
          <TypographyMuted className="text-red-500">
            {state.serverErrors}
          </TypographyMuted>
        )}
      </div>
    </form>
  );
}
