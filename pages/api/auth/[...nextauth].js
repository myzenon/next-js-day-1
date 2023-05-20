import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'ABCDE',
            credentials: {
                email: { label: "My E-mail", type: "email", placeholder: "email@google.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // fetch(api login)
                if (credentials.email == 'my@email.com' && credentials.password == 'mypassword') {
                    // fetch user data
                    return {
                        firstName: 'myFirstName',
                        lastName: 'myLastName',
                        name: 'myName'
                    }
                }
                else {
                    return null
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.lastName = user.lastName
            }
            return token
        },
        async session({ session, user, token }) {
            if (token) {
                session.user.lastName = token.lastName
            }
            return session
        },
    },
    pages: {
        signIn: '/login'
    },
}

export default NextAuth(authOptions)