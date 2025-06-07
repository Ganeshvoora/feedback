"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PrivateRoute from '@/components/PrivateRoute';

interface FeedbackItem {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  username?: string;
}

const ViewFeedbackPage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  // Fetch feedback data
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await fetch('/api/feedback');
        
        if (!res.ok) {
          throw new Error('Failed to fetch your feedback');
        }
        
        const data = await res.json();
        setFeedback(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchFeedback();
    }
  }, [status]);

  // Extract title from content (assumes format "Title\n\nMessage")
  const extractTitle = (content: string) => {
    const firstNewlineIndex = content.indexOf('\n');
    return firstNewlineIndex > -1 
      ? content.substring(0, firstNewlineIndex) 
      : content;
  };

  // Extract message from content
  const extractMessage = (content: string) => {
    const firstNewlineIndex = content.indexOf('\n\n');
    return firstNewlineIndex > -1 
      ? content.substring(firstNewlineIndex + 2) 
      : '';
  };

  // Format date to readable string
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Loading state
  if (status === 'loading' || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <PrivateRoute>
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-2xl font-bold text-center ml-3">Your Feedback Submissions</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {feedback.length === 0 && !loading && !error ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500">You haven&apos;t submitted any feedback yet.</p>
          <button
            onClick={() => router.push('/feedback/new')}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Submit New Feedback
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedback.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{extractTitle(item.content)}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{extractMessage(item.content)}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Submitted: {formatDate(item.createdAt)}</span>
                <span>Submitted by: {item.username}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
    </PrivateRoute>
  );
};

export default ViewFeedbackPage;