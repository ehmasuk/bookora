import axios, { AxiosResponse } from "axios";

import Credentials from "next-auth/providers/credentials";

import NextAuth, { type DefaultSession } from "next-auth";
import { z } from "zod";

import type { NextApiRequest, NextApiResponse } from "next";

import type { Session } from "next-auth";

import type { GetServerSidePropsContext } from "next";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      token: string;
      status: string[];
    } & DefaultSession["user"];
  }
}

export interface LoginResponse {
  code: number;
  message: string;
  token: string;
  data: {
    id: string;
    name: string;
    email: string;
    status: string[];
  };
}

const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const nextAuth = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      authorize: async (credentials) => {
        try {
          // email and password provided by the user to sign in
          const { email, password } = CredentialsSchema.parse(credentials);

          // signin request to the server with the provided credentials
          const res: AxiosResponse<LoginResponse> = await axios.post(
            process.env.NEXT_PUBLIC_API_URI + "/auth/login",
            { email, password },
          );
          const { data, token }: LoginResponse = res.data;

          // id there is no data means authentication failed -> return null
          if (!data) return null;

          return {
            id: data.id,
            name: data.name,
            email: data.email,
            token,
            status: data.status,
          };
        } catch (err) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token?.user) {
        session.user = token.user as typeof session.user;
      }
      return session;
    },
  },
});

export const handlers = nextAuth.handlers;

export const auth: {
  (req: NextApiRequest, res: NextApiResponse): Promise<Session | null>;
  (): Promise<Session | null>;
  (context: GetServerSidePropsContext): Promise<Session | null>;
} = nextAuth.auth;
