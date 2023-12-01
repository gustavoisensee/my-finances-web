import { AuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'name@email.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const res = await fetch(`${API_URL}/auth`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
        })
        const user = await res.json();

        if (res.ok && user?.token) {
          return {
            ...credentials,
            id: user.userId,
            name: user.userName,
            image: '',
            api_token: user.token
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.api_token) {
        token.api_token = user.api_token;
      }
      return token
    },
    async session({ session, token }) {
      if (token?.api_token) {
        session.api_token = token.api_token as string;
      }
      return session
    }
  }
}

export default authOptions;
