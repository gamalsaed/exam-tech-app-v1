import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginResponse } from "./lib/types/auth";

export const authOption: AuthOptions = {
  pages: {
    signOut: "/auth/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials, req) => {
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const payload: ApiResponse<LoginResponse> = await response.json();

        if ("code" in payload) {
          throw new Error(payload.message);
        }

        const accessToken = payload.token ?? "";

        return {
          id: payload.user._id,
          accessToken,
          user: payload.user,
        };
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user, trigger, session }) => {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user.user;
      }

      if (trigger === "update") {
        token.accessToken = session.accessToken;
      }

      return token;
    },

    session: ({ session, token }) => {
      session.user = token.user;

      return session;
    },
  },
};
