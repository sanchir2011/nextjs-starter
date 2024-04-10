import Forgot from "@/components/auth/Forgot"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from 'next/navigation'

export const metadata = {
    title: 'Нууц үг сэргээх'
}

export default async function ForgotPage(){
    const session = await getServerSession(authOptions)
    if(session) {
        redirect('/')
        return
    }

    return <Forgot />
}