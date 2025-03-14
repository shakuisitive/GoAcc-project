// src/app/layout.tsx
import './globals.css';
import Navbar from '@/components/Navbar';
import AuthProvider from '@/components/AuthProvider'; // Import the new Client Component

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <AuthProvider>
          <Navbar />
          <main className="">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}