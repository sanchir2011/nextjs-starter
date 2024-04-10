import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["cyrillic-ext", "cyrillic", "latin"] })

export const metadata = {
    title: "Starter Kit",
    description: "Next.js Starter Kit by Sanchir Enkhbold",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    )
}
