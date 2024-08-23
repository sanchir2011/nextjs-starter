'use client'

import { useState } from 'react'
import { isValidEmail, isValidUsername } from '@/utils/util'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const searchParams = useSearchParams()
    const redirectUrl = searchParams.get('url')

    const handleEmailUsernameChange = (event) => setEmail(event.target.value)
    const handlePasswordChange = (event) => setPassword(event.target.value)

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') handleLogin(event)
    }

    const signInWithGoogle = async () => {
        if(redirectUrl) {
            await signIn('google', { callbackUrl: redirectUrl })
            return
        }
        await signIn('google')
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        
        if(!email) return toast.error('Имэйл хаяг хоосон байна')
        if(!password) return toast.error('Нууц үг хоосон байна')
        if(!isValidEmail(email)) return toast.error('Имэйл эсвэл нэвтрэх нэр буруу байна')
        setLoading(true)
        const response = await signIn('credentials', {
            email,
            password,
            redirect: false
        })
        setLoading(false)
        if(response.error) return toast.error(response.error)
        if(response.ok === false) return toast.error('Нэвтэрхэд алдаа гарлаа')
        toast.success('Амжилттай нэвтэрлээ')
        setTimeout(() => {
            if(redirectUrl) router.push(redirectUrl)
            else router.push('/')
        }, 100)
    }

    const routeToRegister = () => {
        if(redirectUrl) router.push(`/register?url=${redirectUrl}`)
        else router.push('/register')
    }

    return (
        <div className="w-full p-6 sm:w-[380px] sm:p-0">
            <div className="text-center flex flex-col items-center">
                <h2 className="text-2xl font-bold leading-9 tracking-tight text-dark-50 mt-4">
                    Нэвтрэх
                </h2>
            </div>

            <div className="mt-6">
                <div className="space-y-4 grid grid-cols-2">
                    <div className='col-span-full'>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-dark-50">
                            Имэйл хаяг
                        </label>
                        <div className="mt-2">
                            <input id="email" onChange={handleEmailUsernameChange} name="email" type="email" placeholder="sanchir@mail.mn" required autoFocus className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset bg-dark-800 ring-dark-700 placeholder:text-dark-500 focus:ring-2 focus:ring-inset focus:ring-dark-100 sm:text-sm sm:leading-6" />
                        </div>
                    </div>

                    <div className='col-span-full'>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-dark-50">
                            Нууц үг
                        </label>
                        <div className="mt-2">
                            <input id="password" onChange={handlePasswordChange} name="password" type="password" placeholder='Таны нууц үг' onKeyDown={handleKeyDown} required className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset bg-dark-800 ring-dark-700 placeholder:text-dark-500 focus:ring-2 focus:ring-inset focus:ring-dark-100 sm:text-sm sm:leading-6" />
                        </div>
                        <div className="flex items-center justify-end mt-1">
                            <div className="text-sm leading-6">
                                <Link href="/forgot" className="font-semibold text-dark-300 hover:text-dark-50">
                                    Нууц үгээ мартсан уу?
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className='col-span-full'>
                        <button type="button" onClick={handleLogin} className="flex w-full justify-center rounded-md bg-dark-100 px-3 py-1.5 text-sm font-semibold leading-6 text-dark-800 shadow-sm hover:bg-dark-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-100" >
                            Нэвтрэх
                        </button>
                    </div>
                </div>

                <div className="relative mt-6">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-dark-800" />
                    </div>
                    <div className="relative flex justify-center text-sm font-medium leading-6">
                        <span className="bg-dark-950 px-6 text-dark-400">Эсвэл</span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4">
                    <button type="button" onClick={signInWithGoogle} className="flex w-full items-center justify-center gap-3 rounded-md bg-dark-800 px-3 py-2 text-sm font-semibold text-dark-1000 shadow-sm ring-1 ring-inset ring-dark-800 hover:bg-dark-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-100" >
                        <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                            <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                            <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                            <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                            <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                        </svg>
                        <span className="text-sm font-semibold leading-6">Google</span>
                    </button>
                </div>

                <p className="mt-6 text-sm leading-6 text-dark-400 text-center">
                    Шинэ хэрэглэгч үү?{' '}
                    <span onClick={routeToRegister} className="cursor-pointer font-semibold text-dark-100 hover:text-dark-200 ml-1">
                        Бүртгэл үүсгэх
                    </span>
                </p>
            </div>
        </div>
    )
}