import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const API_URL = process.env.API_URL;

export const authOptions = {
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
            token: user.token
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    // @ts-ignore
    async session({ session, token }) {
      return { ...session, token };
    }
  }
}

export default NextAuth(authOptions);
