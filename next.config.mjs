/** @type {import('next').NextConfig} */
const nextConfig = { 
    output: 'export',
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    reactStrictMode: false,
};
 
export default nextConfig;
