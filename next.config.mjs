/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["source.unsplash.com", "drive.google.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
