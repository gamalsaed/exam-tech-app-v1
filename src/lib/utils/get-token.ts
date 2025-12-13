import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getToken() {
  const cookieName = "next-auth.session-token";

  const tokenCookie = cookies().get(cookieName)?.value;
  if (!tokenCookie) return null;
  try {
    const jwt = await decode({
      token: tokenCookie,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    return jwt;
  } catch (error) {
    return null;
  }
}

// dosen't work i fount that the cookie name dosen't change
// process.env.NODE_ENV === "production"
//   ? "__Secure-next-auth.session-token"
//   :
