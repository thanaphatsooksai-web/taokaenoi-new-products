// BASE_PATH ถูกตั้งอัตโนมัติตอน deploy บน GitHub Pages (เช่น /taokaenoi-new-products)
const basePath = process.env.BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: process.env.NEXT_DIST_DIR || ".next",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
  // ให้ไฟล์ใน public (เช่นวิดีโอ) อ้างอิง path ถูกต้องบน GitHub Pages
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
export default nextConfig;
