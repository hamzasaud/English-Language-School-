/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'via.placeholder.com', 
      'img.youtube.com', 
      'i.ytimg.com', 
      'images.unsplash.com',
      'randomuser.me'
    ],
  },
}

module.exports = nextConfig
