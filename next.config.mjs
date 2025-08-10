/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cjtx3hsadtd0i8uk.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
