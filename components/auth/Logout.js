'use client'

import { signOut } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

export default function Logout(){
    const searchParams = useSearchParams()
    const redirectUrl = searchParams.get('url')

    if(redirectUrl) signOut({ callbackUrl: redirectUrl })
    else signOut({ callbackUrl: "/" })

    return (
        <div className="flex h-screen justify-center items-center font-semibold text-dark-100 px-16 text-center">
            Таныг системээс гаргаж байна. Түр хүлээнэ үү...
        </div>
    )
}