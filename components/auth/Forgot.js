'use client'

import { useState } from 'react'
import { isValidEmail } from '@/utils/util'
import { forgotPassword } from '@/utils/request'
import { toast } from 'sonner'
import Link from 'next/link'

export default function Forgot() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleEmailChange = (event) => setEmail(event.target.value)

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') handleReset(event)
    }

    const handleReset = async (e) => {
        e.preventDefault()
        if(!email) return toast.error('Имэйл хаягаа оруулна уу')
        if(!isValidEmail(email)) return toast.error('Имэйл хаяг буруу байна')

        setLoading(true)
        const res = await forgotPassword(email)
        setLoading(false)
        if(!res) return toast.error('Сервертэй холбогдоход алдаа гарлаа')
        if(res.error) return toast.error(res.error)
        toast.success('Имэйл хаяг руу код илгээлээ')
        setSuccess(true)
    }
    
    return (
        <div className="w-full p-6 sm:w-[380px] sm:p-0 mx-auto">
            <div className="text-center flex flex-col items-center">
                <h2 className="text-2xl font-bold leading-9 tracking-tight text-zinc-50 mt-4">
                    Нууц үг сэргээх
                </h2>
            </div>

            <div className="mt-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-zinc-50">
                            Имэйл хаяг
                        </label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" onChange={handleEmailChange} onKeyDown={handleKeyDown} placeholder="sanchir@mail.mn" required autoFocus className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset bg-zinc-800 ring-zinc-700 placeholder:text-zinc-500 focus:ring-2 focus:ring-inset focus:ring-zinc-100 sm:text-sm sm:leading-6" />
                        </div>
                        <p className='text-xs text-zinc-300 mt-2'>Бүртгэлтэй имэйл хаягаа оруулна уу.</p>
                    </div>

                    <div className='pt-2'>
                        { loading ? (
                            <button type="button" className="flex w-full justify-center rounded-md bg-zinc-100 px-3 py-1.5 text-sm font-semibold leading-6 text-zinc-50 shadow-sm" >
                                Уншиж байна...
                            </button>
                        ) : (
                            success ? (
                                <div className='relative'>
                                    <button type="button" className="flex w-full justify-center rounded-md bg-zinc-700 px-3 py-1.5 text-sm font-semibold leading-6 text-zinc-50 shadow-sm" >
                                        Амжилттай илгээлээ!
                                    </button>
                                    <div className='absolute -bottom-16 w-full text-center'>
                                        <p className='text-xs text-zinc-300 leading-6'>Имэйл хаягаа шалгана уу. Хэрвээ код ирээгүй бол СПАМ хэсэгээ давхар шалгана уу.</p>
                                    </div>
                                </div>
                            ) : (
                                <button type="button" onClick={handleReset} className="flex w-full justify-center rounded-md bg-zinc-100 px-3 py-1.5 text-sm font-semibold leading-6 text-zinc-800 shadow-sm hover:bg-zinc-200" >
                                    Код илгээх
                                </button>
                            )
                        ) }
                        { !success && (
                            <p className="mt-4  text-center text-sm leading-6 text-zinc-400">
                                Нууц үгээ сансан уу?{' '}
                                <Link href="/login" className="font-semibold text-zinc-100 hover:text-zinc-200 ml-1">
                                    Нэвтрэх
                                </Link>
                            </p>
                        ) }
                    </div>
                </div>
            </div>
        </div>
    )
}