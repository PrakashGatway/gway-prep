/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["geoip-lite"],
  async headers() {
    return [
      {
        source: "/api/:path((?!analytics/).*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },

  compiler: {
    removeConsole: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  compress: true,
  poweredByHeader: false,

  reactStrictMode: true,

  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "date-fns", "swiper"],
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   compiler: {
//     removeConsole: false,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
// }

// export default nextConfig
