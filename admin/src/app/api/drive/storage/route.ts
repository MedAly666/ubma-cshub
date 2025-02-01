import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { google } from "googleapis";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2Client.setCredentials({ access_token: session.accessToken });
  const drive = google.drive({ version: "v3", auth: oauth2Client });

  try {
    const response = await drive.about.get({
      fields: "storageQuota",
    });
    const data = {
      total: Number(response.data.storageQuota?.limit),
      used: Number(response.data.storageQuota?.usage),
      left:
        Number(response.data.storageQuota?.limit) -
        Number(response.data.storageQuota?.usage),
    };
    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse("Failed to get storage information", {
      status: 500,
    });
  }
}
