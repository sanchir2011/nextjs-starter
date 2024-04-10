import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch(process.env.BACKEND_URL + "/auth/login", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" },
                    cache: 'no-store'
                })
                const user = await res.json()
                
                if (res.ok && user && user.status === 501) throw new Error('Google хаягаар нэвтэрнэ үү')
                if (res.ok && user && user.status === 200) return user
                throw new Error('Бүртгэл oлдсонгүй')
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    pages: {
        signIn: "/login",
        signOut: "/logout",
        error: "/login",
    },
    session: {
        strategy: "jwt",
        jwt: true,
        maxAge: 7 * 24 * 60 * 60, // 7 days
    },
    callbacks: {
        async jwt({ token, user, account, profile, trigger, session }) {
            if(account && account.provider === "google"){
                const response = await fetch(process.env.BACKEND_URL + "/auth/google", {
                    method: 'POST',
                    body: JSON.stringify(profile),
                    headers: { "Content-Type": "application/json" }
                })
                user = await response.json()
                if(response.ok && user && user.status === 200) return { ...user };
            }
            if(trigger == "update"){
                return { ...token, ...session.user }
            }
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token;
            return session;
        },
        async signIn({ account, profile }) {
            return true
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST } 