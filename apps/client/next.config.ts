import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // @jewellery/types ships TypeScript source, so Next must compile it.
  transpilePackages: ["@jewellery/types"],
}

export default nextConfig
