/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "images.unsplash.com",
      "dummyimage.com",
      "digiexplora.s3.ap-south-1.amazonaws.com",
      "fakestoreapi.com",
    ],
  },
};

export default nextConfig;
