import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

// Best practice: create a singleton instance of PrismaClient
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function POST(req: NextRequest) {
  try {
    // Get data from request body
    const { username, email, password, type } = await req.json();

    // Basic validation
    if (!username || !email || !password || !type) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user exists by username or email
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: existingUser.username === username ? "Username already exists" : "Email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        type
      },
      // Only return safe fields
      select: {
        id: true,
        username: true,
        email: true,
        type: true
      }
    });

    return NextResponse.json(
      { message: "User created successfully", user }, 
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}