import Login from "@/components/auth/Login"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from 'next/navigation'

export const metadata = {
    title: 'Нэвтрэх'
}

export default async function LoginPage() {
    const session = await getServerSession(authOptions)
    if(session) {
        redirect('/')
        return
    }

    return <Login />
}