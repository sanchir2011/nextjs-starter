/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/v1/api/:path*',
                destination: process.env.BACKEND_URL + '/api/:path*'
            },
            {
                source: '/v1/api/auth/:path*',
                destination: process.env.BACKEND_URL + '/auth/:path*'
            }
        ]
    },
    transpilePackages: ['lucide-react'],
    reactStrictMode: false
}

export default nextConfig;
