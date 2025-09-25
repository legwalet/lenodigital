import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { UserRole } from "@/types"

export const authOptions: NextAuthOptions = {
  // Temporarily disable adapter to test credentials provider
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials')
          return null
        }

        console.log('Login attempt:', { email: credentials.email })

        try {
          // Find user in database
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
            include: {
              teacherProfile: true,
              parentProfile: true,
              studentProfile: true,
              adminProfile: true,
            },
          })

          if (!user) {
            console.log('User not found:', credentials.email)
            return null
          }

          if (!user.password) {
            console.log('User has no password set')
            return null
          }

          // Verify password
          const isValid = await bcrypt.compare(credentials.password, user.password)
          if (!isValid) {
            console.log('Invalid password for:', credentials.email)
            return null
          }

          console.log('Login successful:', { email: user.email, role: user.role })
          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            role: user.role as UserRole,
            image: user.avatar,
          }
        } catch (error) {
          console.error('Login error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as UserRole
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/signin",
  }
}
