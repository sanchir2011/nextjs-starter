'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { validateCode, resetPassword } from '@/utils/request'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { CircleX } from 'lucide-react'

export default function VerifyReset(){
    const [loading, setLoading] = useState(true)
    const [btnLoading, setBtnLoading] = useState(false)
    const [valid, setValid] = useState(false)
    const [success, setSuccess] = useState(false)

    const [password, setPassword] = useState('')
    const [passwordRep, setPasswordRep] = useState('')

    const searchParams = useSearchParams()
    const router = useRouter()
 
    const email = searchParams.get('email')
    const code = searchParams.get('code')

    useEffect(() => {
        if(email && code) {
            const verify = async () => {
                const response = await validateCode(email, code)
                if(response && response.status == 200) setValid(true)
                else setValid(false)
                setLoading(false)
            }
            verify()
        }
    }, [email, code])

    const handlePasswordChange = (event) => setPassword(event.target.value)
    const handlePasswordRepChange = (event) => setPasswordRep(event.target.value)

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') handleResetPassword(event)
    }

    const handleResetPassword = async (e) => {
        e.preventDefault()

        if(!email) return toast.error('Имэйл хоосон байна')
        if(!code) return toast.error('Код хоосон байна')
        if(!password) return toast.error('Нууц үг хоосон байна')
        if(!passwordRep) return toast.error('Нууц үг давтах хоосон байна')
        if(password.length < 8) return toast.error('Нууц үг богинхон байна')
        if(password !== passwordRep) return toast.error('Нууц үг таарахгүй байна')

        setLoading(true)
        const response = await resetPassword(email, password, code)
        if(!response) {
            setLoading(false)
            return toast.error('Сервертэй холбогдоход алдаа гарлаа')
        }
        if(response.error) {
            setLoading(false)
            return toast.error(response.error)
        }
        toast.success('Амжилттай нууц үг солигдлоо')
        setTimeout(() => {
            router.push('/login')
        }, 100)
    }

    
    return (
        <div>
            { !loading && (
                valid ? (
                    <div className='w-full p-6 sm:w-[380px] sm:p-0 mx-auto'>
                        <div className="text-center flex flex-col items-center">
                            <h2 className="text-2xl font-bold leading-9 tracking-tight text-zinc-50 mt-4">
                                Нууц үг сэргээх
                            </h2>
                        </div>
                        <div className="space-y-4 mt-6">
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-zinc-50">
                                    Шинэ нууц үг
                                </label>
                                <div className="mt-2">
                                    <input id="password" onChange={handlePasswordChange} name="password" autoFocus type="password" placeholder='Таны шинэ нууц үг' onKeyDown={handleKeyDown} required className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset bg-zinc-800 ring-zinc-700 placeholder:text-zinc-500 focus:ring-2 focus:ring-inset focus:ring-zinc-100 sm:text-sm sm:leading-6" />
                                </div>
                                <p className='text-xs mt-1 text-zinc-200'>8-аас дээш тэмдэгтэй байх ёстой</p>
                            </div>

                            <div>
                                <label htmlFor="passwordRep" className="block text-sm font-medium leading-6 text-zinc-50">
                                    Шинэ нууц үг давтах
                                </label>
                                <div className="mt-2">
                                    <input id="passwordRep" onChange={handlePasswordRepChange} name="passwordRep" type="password" placeholder='Шинэ нууц үг давтах' onKeyDown={handleKeyDown} required className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset bg-zinc-800 ring-zinc-700 placeholder:text-zinc-500 focus:ring-2 focus:ring-inset focus:ring-zinc-100 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div className='pt-2'>
                                { btnLoading ? (
                                    <button type="button" className="flex w-full justify-center rounded-md bg-zinc-100 px-3 py-1.5 text-sm font-semibold leading-6 text-zinc-800 shadow-sm" >
                                        Уншиж байна ...
                                    </button>
                                ) : (
                                    <button type="button" onClick={handleResetPassword} className="flex w-full justify-center rounded-md bg-zinc-100 px-3 py-1.5 text-sm font-semibold leading-6 text-zinc-800 shadow-sm hover:bg-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-100" >
                                        Нууц үг солих
                                    </button>
                                ) }
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col gap-4 items-center justify-center'>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                            <CircleX className='w-20 h-20 text-zinc-50' />
                        </motion.div>
                        <motion.div className='text-center text-xl font-semibold text-zinc-50' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                            Код хүчингүй болсон эсвэл имэйл хаяг буруу байна 😢
                        </motion.div>
                        <motion.div className='flex-grow-0 mt-4' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                            <button onClick={() => router.push('/')} type="button" className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20" >
                                Нүүр хуудас
                            </button>
                        </motion.div>
                    </div>
                )
            ) }
        </div>
    )
}