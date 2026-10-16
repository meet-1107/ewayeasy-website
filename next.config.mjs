/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};
export default nextConfig;
