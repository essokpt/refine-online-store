/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental:{
  //   serverActions : true
  // },
  // reactStrictMode: true,
  // swcMinify: true,
  transpilePackages: ["@refinedev/antd"],
  output: "standalone",
};

export default nextConfig;
