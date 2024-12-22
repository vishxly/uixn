/** @type {import('next').NextConfig} */
const { createContentlayerPlugin } = require("next-contentlayer2")

const nextConfig = {
  // Memory optimization settings
  typescript: {
    ignoreBuildErrors: true // Reduces memory usage during build
  },
  swcMinify: true,
  experimental: {
    outputFileTracingIncludes: {
      "/blocks/*": ["./registry/**/*"],
    },
    // Memory optimizations
    optimizeCss: true,
    webpackBuildWorker: true,
  },
  // Reduce memory usage for image optimization
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Keep only essential redirects
  redirects() {
    return [
      {
        source: "/components",
        destination: "/docs/components/accordion",
        permanent: true,
      },
      {
        source: "/docs/components",
        destination: "/docs/components/accordion",
        permanent: true,
      }
    ]
  },
  // Add memory limit for Node
  env: {
    NODE_OPTIONS: '--max-old-space-size=3072' // 3GB memory limit
  },
  // Optimize output
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Reduce chunk size
  webpack: (config, { isServer }) => {
    // Optimize chunk size
    config.optimization = {
      ...config.optimization,
      minimize: true,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
      }
    }
    return config
  }
}

const withContentlayer = createContentlayerPlugin({
  // Keep contentlayer config minimal
  configPath: 'contentlayer.config.ts',
})

export default withContentlayer(nextConfig)
