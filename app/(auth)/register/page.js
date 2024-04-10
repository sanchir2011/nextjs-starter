import Register from "@/components/auth/Register"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from 'next/navigation'

export const metadata = {
    title: 'Бүртгүүлэх'
}

export default async function RegisterPage(){
    const session = await getServerSession(authOptions)
    if(session) {
        redirect('/')
        return
    }

    return <Register />
}