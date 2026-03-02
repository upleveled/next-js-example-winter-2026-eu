import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  typedRoutes: true,
  images: {
    // Disable image optimization on Fly.io to avoid crashes from 256MB memory limit
    unoptimized: !process.env.VERCEL,
  },
  typescript: {
    // Ignore TypeScript errors because we already check during CI
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
