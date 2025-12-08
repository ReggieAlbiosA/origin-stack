import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // baseURL defaults to same origin, only set if auth server is on different domain
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});
