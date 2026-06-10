// src/auth.config.ts
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const authConfig = {
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  providers: [
    // We leave the authorize function empty or minimal here.
    // It will be fully defined in the Node.js-backed auth.ts file.
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: () => null 
    })
  ]
} satisfies NextAuthConfig