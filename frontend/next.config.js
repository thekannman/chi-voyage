/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow images from our own domain
    domains: ['localhost', 'ftyfcaarajpklaobdgdd.supabase.co', 'maps.googleapis.com'],
    // Configure remote patterns for external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ftyfcaarajpklaobdgdd.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/api/**',
      },
    ],
  },
  // Enable static image imports
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/images/',
            outputPath: 'static/images/',
            name: '[name].[hash].[ext]',
          },
        },
      ],
    });
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/sitemap-:id.xml',
        destination: '/sitemap/:id.xml',
      },
    ]
  },
};

module.exports = nextConfig; 