
/* @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'media.istockphoto.com', },
            { protocol: 'https', hostname: 'example.com', },
            { protocol: 'https', hostname: 'images.unsplash.com', }, 
        ]
    },
};

export default nextConfig;