/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', 'ogl', '@react-three/fiber', 'motion', 'lenis'],
};

export default nextConfig;
