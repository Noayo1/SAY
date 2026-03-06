/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.extensionAlias = {
      ".js": [".js", ".mjs", ".cjs", ".ts"],
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/files/**",
      },
    ],
  },
};

export default nextConfig;
