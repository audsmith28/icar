import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export type UserRole = 'public' | 'org' | 'funder' | 'admin';

export interface ExtendedUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    organizationId?: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "admin" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Mock users for testing different roles
                const users: Record<string, ExtendedUser> = {
                    'admin': { id: "1", name: "Admin User", email: "admin@icar.co.il", role: 'admin' },
                    'org': { id: "2", name: "NGO User", email: "ngo@example.org", role: 'org', organizationId: 's1' },
                    'funder': { id: "3", name: "Funder User", email: "funder@foundation.org", role: 'funder' },
                };

                const username = credentials?.username || '';
                const password = credentials?.password || '';

                // Simple auth: username matches role, password is "password"
                if (password === "password" && users[username]) {
                    return users[username] as any;
                }

                return null;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET || 'icar-dev-secret-key-change-in-production',
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as ExtendedUser).role;
                token.organizationId = (user as ExtendedUser).organizationId;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).organizationId = token.organizationId;
            }
            return session;
        },
    },
    debug: process.env.NODE_ENV === 'development',
};
