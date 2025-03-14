import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="min-h-fit bg-gradient-to-b from-blue-100 to-white">
      <Head>
        <title>Dropbox - Work Better Together</title>
        <meta name="description" content="Simplify your work with Dropbox." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main Content */}
      <main className="py-24 px-4 flex flex-col items-center text-center w-full">
        <div className="w-full max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Work better, safer, together.
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Dropbox Business simplifies your work, with a central place to access
            and share files.
          </p>
          <div className="space-x-4 mb-8">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
              Try Dropbox Business free
            </button>
            <button className="bg-transparent border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-100">
              Get Dropbox Basic
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Try Dropbox Business free for 30 days. No credit card needed.
          </p>
        </div>
        {/* Placeholder for laptop image */}
        <div className="mt-16 w-full">
          <img
            src="https://via.placeholder.com/800x400" // Replace with actual laptop image URL
            alt="Collaboration with laptop"
            className="w-full h-auto"
          />
        </div>
      </main>

      {/* Footer (optional, kept minimal) */}
      <footer className="bg-gray-900 py-6 w-full">
        <div className="text-center text-white">
          <p>© {new Date().getFullYear()} Dropbox</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;