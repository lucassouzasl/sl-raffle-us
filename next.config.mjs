/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["source.unsplash.com", "drive.google.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
