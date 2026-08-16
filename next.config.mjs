/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["huggingface.co", "raw.githubusercontent.com", "avatars.githubusercontent.com"],
  },
};

export default nextConfig;
