/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: true
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },

  reactStrictMode: true,

  experimental: {
    optimizePackageImports: [
      "lucide-react",
    ],
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


