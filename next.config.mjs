// BASE_PATH ถูกตั้งอัตโนมัติตอน deploy บน GitHub Pages (เช่น /taokaenoi-new-products)
const basePath = process.env.BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: process.env.NEXT_DIST_DIR || ".next",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
