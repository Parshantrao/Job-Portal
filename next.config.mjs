/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SUPABASE_PROJECT_URL: process.env.SUPABASE_PROJECT_URL,
        SUPABASE_API_KEY: process.env.SUPABASE_API_KEY,
      },
};

export default nextConfig;
