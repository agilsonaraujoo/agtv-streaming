module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org'],
  },
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    return config;
  },
}
