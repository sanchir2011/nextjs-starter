'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { verifyEmail } from '@/utils/request'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { CircleCheck, CircleX } from 'lucide-react'

export default function VerifyEmail(){
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState('')

    const searchParams = useSearchParams()
    const router = useRouter()
 
    const email = searchParams.get('email')
    const code = searchParams.get('code')

    useEffect(() => {
        if(email && code) {
            const verify = async () => {
                const response = await verifyEmail(email, code)
                if(response && response.status == 200) {
                    setSuccess(true)
                    setMessage('Имэйл хаяг амжилттай баталгаажлаа 🤗')
                }
                else {
                    setSuccess(false)
                    setMessage('Код хүчингүй болсон эсвэл имэйл хаяг буруу байна 😢')
                }
                setLoading(false)
            }
            verify()
        }
    }, [email, code])

    return (
        <div className='flex flex-col gap-4 items-center justify-center'>
            { !loading && (
                <>
                    { success ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                            <CircleCheck className='w-20 h-20 text-zinc-50' />
                        </motion.div>
                    ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                            <CircleX className='w-20 h-20 text-zinc-50' />
                        </motion.div>
                    ) }
                    <motion.div className='text-center text-xl font-semibold text-zinc-50 px-8' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>{ message }</motion.div>
                    <motion.div className='flex-grow-0 mt-4' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                        <button onClick={() => router.push('/')} type="button" className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-zinc-50 shadow-sm hover:bg-white/20" >
                            Нүүр хуудас
                        </button>
                    </motion.div>
                </>
            ) }
        </div>
    )
}