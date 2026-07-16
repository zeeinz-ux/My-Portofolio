/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
};

if (process.env.GITHUB_PAGES === 'true') {
  nextConfig.output = 'export';
  nextConfig.basePath = '/My-Portfolio';
  nextConfig.assetPrefix = '/My-Portfolio/';
  nextConfig.env = {
    NEXT_PUBLIC_BASE_PATH: '/My-Portfolio',
  };
}

export default nextConfig;
