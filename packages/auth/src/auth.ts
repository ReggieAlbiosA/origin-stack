import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@repo/database/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 * 60 * 24 * 7, // 7 days cache duration
    },
  },

  experimental: { joins: true },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    // gitlab: {
    //   clientId: process.env.GITLAB_CLIENT_ID as string,
    //   clientSecret: process.env.GITLAB_CLIENT_SECRET as string,
    //   issuer: process.env.GITLAB_ISSUER as string, // Optional: defaults to https://gitlab.com
    // },
  },
});
