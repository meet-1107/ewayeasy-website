/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  // Low-memory machines can set BUILD_CPUS=1 to build with a single worker.
  ...(process.env.BUILD_CPUS ? { experimental: { cpus: Number(process.env.BUILD_CPUS) } } : {}),
};
export default nextConfig;
