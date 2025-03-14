"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-white text-2xl font-extrabold tracking-tight hover:text-indigo-300 transition-colors duration-200"
        >
          GoAccelovate
        </Link>

        {/* Authentication Links/Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {session ? (
            <>
              {/* Dashboard Button - Only visible when logged in */}
              <Link
                href="/dashboard"
                className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 hover:shadow-md transition-all duration-200 ease-in-out"
              >
                Dashboard
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                className="bg-red-600 text-white px-5 py-2 rounded-full font-medium hover:bg-red-700 hover:shadow-md transition-all duration-200 ease-in-out"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/signin"
                className="text-gray-200 px-5 py-2 rounded-full font-medium border border-gray-600 hover:bg-gray-700 hover:text-white hover:border-gray-500 transition-all duration-200 ease-in-out"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-indigo-600 text-white px-5 py-2 rounded-full font-medium hover:bg-indigo-700 hover:shadow-md transition-all duration-200 ease-in-out"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
