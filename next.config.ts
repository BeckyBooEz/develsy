import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://192.168.3.14"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;