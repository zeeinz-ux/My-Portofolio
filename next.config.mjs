/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
};

if (process.env.GITHUB_PAGES === 'true') {
  nextConfig.output = 'export';
  nextConfig.basePath = '/My-Portofolio';
  nextConfig.assetPrefix = '/My-Portofolio/';
  nextConfig.env = {
    NEXT_PUBLIC_BASE_PATH: '/My-Portofolio',
  };
}

export default nextConfig;
