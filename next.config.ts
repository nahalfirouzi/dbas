import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",

  /* subdir path for github pages */
  basePath: "/dbas",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
