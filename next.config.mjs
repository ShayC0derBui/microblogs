/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://microblogging-platform-api.vercel.app/:path*", // Your API base URL
      },
    ];
  },
};

export default nextConfig;
