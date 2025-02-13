"use server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { google } from "googleapis";
import { Readable } from "stream";

interface UploadToDriveState {
  error?: string;
  success: boolean;
}
export async function uploadToDrive(
  prevState: UploadToDriveState,
  formData: FormData
) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return { success: false, error: "Unauthorized" };
  }
  const file = formData.get("file") as File;
  if (!file) {
    return { success: false, error: "No file uploaded" };
  }

  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: session.accessToken });
    const drive = google.drive({ version: "v3", auth: oauth2Client });
    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    const response = await drive.files.create({
      requestBody: { name: file.name, mimeType: file.type },
      media: { mimeType: file.type, body: stream },
    });

    await drive.permissions.create({
      fileId: response.data.id!,
      requestBody: {
        type: "anyone",
        role: "reader",
      },
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to Upload file",
    };
  }
}
