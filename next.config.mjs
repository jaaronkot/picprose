/** @type {import('next').NextConfig} */
const nextConfig = { 
    output: 'export',
    typescript: {
      ignoreBuildErrors: true,
    },
    reactStrictMode: false,
};
 
export default nextConfig;
