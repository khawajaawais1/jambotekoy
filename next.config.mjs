import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    // Optimized variants are cached at the Vercel edge for a week instead of the 60s default.
    minimumCacheTTL: 604800,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" }
    ]
  },
  async headers() {
    // Media in /public is otherwise served with `max-age=0, must-revalidate` on Vercel,
    // so every repeat visit re-checks every image and video.
    const cache = [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }];
    return [
      { source: "/images/:path*", headers: cache },
      { source: "/videos/:path*", headers: cache }
    ];
  }
};
export default withNextIntl(nextConfig);
