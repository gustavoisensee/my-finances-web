import NextAuth from 'next-auth';

import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const baseUrl = process.env.NEXTAUTH_URL;

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'name@email.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${baseUrl}/api/authentication/signin`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' }
          })

          const user = await res.json();

          if (!res.ok) {
            throw new Error(user.message || 'Invalid credentials');
          }

          return user;
        } catch (e) {
          console.error(e);
          return null;
        }
      }
    })
  ],
  callbacks: {
    // async jwt({ token, user }) {
    //   console.log({ token, user })
    //   if (user) {
    //     token.user = user;
    //   }
    //   return token;
    // },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token ? token.sub : ''
        }
      }
    },
    //   async signIn({ user, account, profile, email, credentials }) {
    //     // You can add additional sign-in logic here if needed
    //     return true; // Return true to allow sign-in
    //   },
    //   async redirect({ url, baseUrl }) {
    //     return baseUrl
    //   },
  },
  pages: {
    signIn: '/login',
    // signOut: '/signout',
    // error: '/signin',
    // verifyRequest: '/signin',
    // newUser: '/signup'
  },
  session: {
    strategy: 'jwt',
  },
}

const handler = NextAuth(authOptions);
export default handler;
export { handler as GET, handler as POST };
