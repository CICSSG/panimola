import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        dangerouslyAllowSVG: true,
    },
    allowedDevOrigins: ["192.168.1.8"]
}

export default nextConfig
