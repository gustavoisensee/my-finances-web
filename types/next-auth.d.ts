import { DefaultSession, DefaultUser, JWT } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    api_token: string;
  }
  interface User extends DefaultUser {
    api_token: string;
  }
  interface JWT {
    api_token: string;
  }
}