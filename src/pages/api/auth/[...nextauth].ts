import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { db } from "@/lib/db"
// import { User, UserSessionTable, UserTable } from "@/lib/schema"
import { eq } from "drizzle-orm"
import cookie from "cookie"
import { sha3_256 } from "js-sha3"

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: "174547810415-03pg6bijkveq8ds35soqbvbmm3qar43e.apps.googleusercontent.com",
            clientSecret: "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",
        }),
    ],
    pages: {
        // signIn: "/auth/login",
    },
}

export default NextAuth(authOptions)