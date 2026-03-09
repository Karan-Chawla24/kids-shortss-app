/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Permissions-Policy",
            value:
              "autoplay=*, encrypted-media=*, fullscreen=*, picture-in-picture=*",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
