
/* @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'media.istockphoto.com', },
            { protocol: 'https', hostname: 'example.com', },
            { protocol: 'https', hostname: 'images.unsplash.com', }, 
            { protocol: 'https', hostname: 'img.daisyui.com',},
            { protocol: 'https', hostname: 'avatars.githubusercontent.com',},
        ]
    },
};

export default nextConfig;