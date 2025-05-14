import { SignJWT, jwtVerify, JWTPayload as JoseJWTPayload } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

interface JWTPayload extends JoseJWTPayload {
  userID: string;
}

export async function generateJWT(payload: JWTPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRATION!)
    .sign(secret);

  return token;
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error("Invalid Token:", error);
    return null;
  }
}
