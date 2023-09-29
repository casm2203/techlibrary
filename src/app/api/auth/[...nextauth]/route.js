import { pool } from "@/database/db.js";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const [result] = await pool.query(
          "SELECT * FROM user WHERE email = ? ORDER BY created_at ASC",
          [credentials?.email]
        );

        if (!result[0]) throw new Error("Usuario o contraseña incorrecta.");

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          result[0].password
        );

        if (!passwordMatch) throw new Error("Usuario o contraseña incorrecta.");

        console.log(result[0]);

        return result[0];
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
