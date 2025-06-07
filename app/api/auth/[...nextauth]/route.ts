// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       username: string;
//       email: string;
//       type: string;
//     }
//     accessToken?: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     username?: string;
//     email?: string; // Added email field
//     type?: string;
//     accessToken?: string;
//   }
// }

// // Create a singleton instance of PrismaClient to avoid too many connections
// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
// const prisma = globalForPrisma.prisma || new PrismaClient();
// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// // Define the auth config and handlers
// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "jsmith" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         try {
//           // Find the user from the database by username
//           if (!credentials?.username || !credentials?.password) {
//             return null;
//           }

//           const user = await prisma.user.findUnique({
//             where: {
//               username: credentials.username
//             }
//           });

//           // If user doesn't exist, return null
//           if (!user) {
//             return null;
//           }

//           // Compare the password
//           const isValidPassword = await bcrypt.compare(credentials.password, user.password);
//           if (!isValidPassword) {
//             return null;
//           }

//           // If valid user, return the user object
//           return {
//             id: user.id,
//             username: user.username,
//             email: user.email,
//             type: user.type,
//           };
//         } catch (error) {
//           console.error("Auth error:", error);
//           return null;
//         }
//       }
//     })
//   ],
//   pages: {
//     signIn: "/signin"
//   },
//   callbacks: {
//     async jwt({ token, user }: any) {
//       // Only runs when user signs in
//       if (user) {
//         token.id = user.id;
//         token.username = user.username;
//         token.email = user.email; // Added email
//         token.type = user.type;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = {
//         id: token.id as string,
//         username: token.username as string,
//         email: token.email as string,
//         type: token.type as string,
//       };

//       if (token.accessToken) {
//         session.accessToken = token.accessToken;
//       }

//       return session;
//     },

//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });

// export { handler as GET, handler as POST };


import NextAuth from "next-auth";
import { authOptions } from "@/app/lib/auth";

// Only export the route handlers
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };