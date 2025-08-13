import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().min(1),
        DATABASE_URL_UNPOOLED: z.string().min(1),
        PGHOST: z.string().min(1),
        PGHOST_UNPOOLED: z.string().min(1),
        PGUSER: z.string().min(1),
        PGDATABASE: z.string().min(1),
        PGPASSWORD: z.string().min(1),
        POSTGRES_URL: z.string().min(1),
        POSTGRES_URL_NON_POOLING: z.string().min(1),
        POSTGRES_USER: z.string().min(1),
        POSTGRES_HOST: z.string().min(1),
        POSTGRES_PASSWORD: z.string().min(1),
        POSTGRES_DATABASE: z.string().min(1),
        POSTGRES_URL_NO_SSL: z.string().min(1),
        POSTGRES_PRISMA_URL: z.string().min(1),
        STACK_SECRET_SERVER_KEY: z.string().min(1),
        CLERK_SECRET_KEY: z.string().min(1),
        BLOB_READ_WRITE_TOKEN: z.string().min(1),
        GOOGLE_GEMINI_API: z.string().min(1),
        STRIPE_SECRET_KEY: z.string().min(1),
    },
    client: {
        NEXT_PUBLIC_STACK_PROJECT_ID: z.string().min(1),
        NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: z.string().min(1),
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
        NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY: z.string().min(1),
        NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY: z.string().min(1),
        NEXT_PUBLIC_BASE_URL: z.string().min(1), 
    },
    experimental__runtimeEnv: {
        NEXT_PUBLIC_STACK_PROJECT_ID: process.env.NEXT_PUBLIC_STACK_PROJECT_ID,
        NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: process.env.NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY,
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY,
        NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY,
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
      }
})