import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { User } from "next-auth";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    accessToken: string;
    user: {
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      role: "user" | "admin" | string;
      isVerified: boolean;
      createdAt: string;
      passwordResetCode?: string | null;
      passwordResetExpires?: string | null;
      resetCodeVerified?: boolean;
      passwordChangedAt?: string | null;
    };
  }

  interface Session {
    user: {
      _id: string;
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      role: "user" | "admin" | string;
      isVerified: boolean;
      createdAt: string;
      passwordResetCode?: string | null;
      passwordResetExpires?: string | null;
      resetCodeVerified?: boolean;
      passwordChangedAt?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends User {
    /** OpenID ID Token */
    idToken?: string;
  }
}
