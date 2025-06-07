import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/app/lib/auth';
// Create a singleton instance of PrismaClient
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// POST: Create new feedback
export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json(
                { message: "Not authenticated" },
                { status: 401 }
            );
        }

        // Get data from request body
        const { title, message } = await request.json();

        // Validate required fields
        if (!title || !message) {
            return NextResponse.json(
                { message: "Title and message are required" },
                { status: 400 }
            );
        }

        // Format content by combining title and message
        const content = `${title}\n\n${message}`;

        // Create feedback in database
        // const feedback = await prisma.feedback.create({
        //   data: {
        //     content,
        //     user: {
        //       connect: { id: session.user.id }
        //     }
        //   }
        // });
        const feedback = await prisma.feedback.create({
            data: {
                content,
                userId: session.user.id
            }
        }); 

        return NextResponse.json(
            { message: "Feedback submitted successfully", feedback },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating feedback:", error);
        return NextResponse.json(
            { message: error.message || "Error creating feedback" },
            { status: 500 }
        );
    }
}