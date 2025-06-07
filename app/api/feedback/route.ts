import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/app/lib/auth';

const prisma = new PrismaClient();

// GET: Get all feedback for the current user
export async function GET() {
  try {

    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    // Get user's feedback
    const feedback = await prisma.feedback.findMany({
      where: {
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    const feedbackWithUsernames = await Promise.all(feedback.map(async(item) => {
      const user = await prisma.user.findUnique({
        where: {
          id: item.userId
        },
        select: {
          username: true
        }
      });
      return {
        ...item,
        username: user?.username || "Unknown User"
      };
    }));
    return NextResponse.json(feedbackWithUsernames);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json(
      { message: error.message || "Error fetching feedback" },
      { status: 500 }
    );
  }
}