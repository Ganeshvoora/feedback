"use client";
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"

const Navbar = () => {
  const { data: session, status } = useSession()
  const [userType, setUserType] = useState("")
  const isAuthenticated = status === "authenticated"

  useEffect(() => {
    // Get user type from localStorage on client-side
    const storedUserType = localStorage.getItem("userType")
    if (storedUserType) {
      setUserType(storedUserType)
    }
  }, [])

  const isAdmin = userType === "admin"

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="font-bold text-xl text-blue-600">Feedback Portal</h1>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          
          {isAuthenticated && !isAdmin && (
            <Link href="/feedback" className="text-gray-700 hover:text-blue-600">
              Send Feedback
            </Link>
          )}
          
          {isAuthenticated && isAdmin && (
            <Link href="/view" className="text-gray-700 hover:text-blue-600">
              View Feedback
            </Link>
          )}
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                Welcome, {session.user?.username}
              </span>
              <button 
                onClick={() => {
                  localStorage.removeItem("userType");
                  signOut({ callbackUrl: '/' });
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/signin" className="text-gray-700 hover:text-blue-600">
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar