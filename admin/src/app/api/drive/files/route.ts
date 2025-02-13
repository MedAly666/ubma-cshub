import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { google } from "googleapis";

export async function GET() {
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
    const response = await drive.files.list({
      q: "'me' in owners",
      fields: "files(id, name, mimeType, webViewLink)",
    });
    return NextResponse.json(response.data.files);
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to fetch files", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
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
    const { id } = await req.json();
    await drive.files.delete({ fileId: id });
    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.log(error);
    return new NextResponse("Failed to fetch files", { status: 500 });
  }
}
