import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      type: string;
    }
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string;
    email?: string;
    type?: string;
    accessToken?: string;
  }
}

// Create a singleton instance of PrismaClient
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        type: { label: "Type", type: "text", placeholder: "admin/user" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { username: credentials.username }
          });

          if (!user) return null;

          const isValidPassword = await bcrypt.compare(credentials.password, user.password);
          if (!isValidPassword) return null;
          if (credentials.type !== user.type) return null;

          return {
            id: user.id,
            username: user.username,
            email: user.email,
            type: user.type,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  pages: { signIn: "/signin" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.type = user.type;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        username: token.username as string,
        email: token.email as string,
        type: token.type as string,
      };

      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};