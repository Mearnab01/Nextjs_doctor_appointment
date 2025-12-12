export const env = {
  // Public
  clerkPublishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
  clerkSignInUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL!,
  clerkSignUpUrl: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL!,
  vonageAppId: process.env.NEXT_PUBLIC_VONAGE_APPLICATION_ID!,

  // Server-only 
  clerkSecretKey: process.env.CLERK_SECRET_KEY!,
  vonageApiKey: process.env.VONAGE_API_KEY!,
  vonagePrivateKeyPath: process.env.VONAGE_PRIVATE_KEY_PATH!,
  databaseUrl: process.env.DATABASE_URL!,
};
