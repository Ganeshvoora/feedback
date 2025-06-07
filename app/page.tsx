"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAuthenticated = status === "authenticated";
  const isAdmin = session?.user?.type === "admin";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to the Feedback Portal
          </h1>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            A simple and efficient way to submit and manage feedback. Help us improve our services by sharing your thoughts.
          </p>
          {!isAuthenticated && (
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => router.push('/signin')} 
                className="bg-white text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => router.push('/signup')} 
                className="bg-blue-700 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-800 transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}
          {isAuthenticated && !isAdmin && (
            <button 
              onClick={() => router.push('/feedback/new')} 
              className="bg-white text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Submit New Feedback
            </button>
          )}
          {isAuthenticated && isAdmin && (
            <button 
              onClick={() => router.push('/admin/feedback')} 
              className="bg-white text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              View All Feedback
            </button>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
            <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
            <p className="text-gray-600">Create an account to get started with our feedback portal.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
            <h3 className="text-xl font-semibold mb-2">Submit Feedback</h3>
            <p className="text-gray-600">Share your thoughts, ideas, and suggestions with our team.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">Follow the status of your feedback as our team reviews and implements changes.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community and help us improve our products and services with your valuable feedback.
          </p>
          
          {!isAuthenticated ? (
            <button 
              onClick={() => router.push('/signup')} 
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium text-lg hover:bg-blue-700 transition-colors"
            >
              Create Account
            </button>
          ) : (
            <button 
              onClick={() => router.push(isAdmin ? '/admin/feedback' : '/feedback/new')} 
              className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium text-lg hover:bg-blue-700 transition-colors"
            >
              {isAdmin ? 'Manage Feedback' : 'Submit Feedback'}
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-right">
              <p>&copy; {new Date().getFullYear()} Feedback Portal. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}