import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/utils/supabaseClient";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { data, error } = await supabase
          .from("users")
          .select("id, email, name, password")
          .eq("email", credentials.email)
          .single();

        if (error || !data || data.password !== credentials.password) {
          // In production, use hashed password comparison (e.g., bcrypt)
          return null;
        }

        return {
          id: data.id,
          name: data.name,
          email: data.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    // Add signIn callback to save user to Supabase
    async signIn({ user, account, profile }: { user: any; account: any; profile?: any }) {
      if (account.provider === "google") {
        try {
          // Check if the user already exists in the database
          const { data: existingUser, error: fetchError } = await supabase
            .from("users")
            .select("id, email, name")
            .eq("email", user.email)
            .single();

          if (fetchError && fetchError.code !== "PGRST116") {
            // PGRST116 means "no rows found", which is fine
            console.error("Error checking for existing user:", fetchError);
            return false;
          }

          if (existingUser) {
            // User already exists, update their name if necessary
            if (existingUser.name !== user.name) {
              await supabase
                .from("users")
                .update({ name: user.name })
                .eq("email", user.email);
            }
            user.id = existingUser.id; // Attach the existing user's ID
          } else {
            // User doesn't exist, create a new user in Supabase
            const { data: newUser, error: insertError } = await supabase
              .from("users")
              .insert({
                email: user.email,
                name: user.name,
                // No password for Google users; you might want to add other fields
              })
              .select("id")
              .single();

            if (insertError) {
              console.error("Error saving user to Supabase:", insertError);
              return false;
            }

            user.id = newUser.id; // Attach the new user's ID
          }

          return true; // Allow sign-in
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false; // Deny sign-in if there's an error
        }
      }
      return true; // Allow sign-in for Credentials provider
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };