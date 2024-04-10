import { Inter } from "next/font/google"
import { Toaster } from 'sonner'
import Provider from "@/components/Provider"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { ThemeModeScript } from 'flowbite-react'
import { SkeletonTheme } from 'react-loading-skeleton'

import { classNames } from "@/utils/util"
import "./globals.css"

const inter = Inter({ subsets: ["cyrillic-ext", "cyrillic", "latin"] })

export const metadata = {
    metadataBase: new URL(process.env.NEXT_URL),
    title: "Next.js Starter Kit",
    description: "Next.js Starter Kit by Sanchir Enkhbold",
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        title: "Next.js Starter Kit",
        description: "Next.js Starter Kit by Sanchir Enkhbold",
        images: [''] // Add images
    },
    twitter: {
        card: "summary_large_image",
        title: "Next.js Starter Kit",
        description: "Next.js Starter Kit by Sanchir Enkhbold",
        images: [''] // Add images
    },
    creator: 'Sanchir Enkhbold',
    publisher: 'Sanchir Enkhbold',
    authors: [{ name: 'Sanchir', url: 'https://sanchir.dev' }],
    keywords: [''], // Add keywords
}

export default async function RootLayout({ children }) {
    const session = await getServerSession(authOptions)

    return (
        <html lang="en">
            <head>
                <ThemeModeScript />
            </head>
            <body className={`${inter.className} bg-zinc-950 text-zinc-50`}>
                <Provider session={session}>
                    <SkeletonTheme baseColor="#18181b" highlightColor="#27272a">
                        <div>
                            {children}
                        </div>
                        <Toaster 
                            position="bottom-right" 
                            closeButton={true} 
                            theme="dark"
                            toastOptions={{
                                classNames: {
                                    toast: '!bg-zinc-900 !border-zinc-800 !text-zinc-50 !rounded-md !shadow-md',
                                },
                            }}  
                        />
                    </SkeletonTheme>
                </Provider>
            </body>
        </html>
    )
}
