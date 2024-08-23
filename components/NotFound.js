'use client'

import { useEffect, useState } from 'react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { BookmarkSquareIcon, BookOpenIcon, QueueListIcon, RssIcon } from '@heroicons/react/24/solid'
import { UserPlus } from 'lucide-react'

const links = [
    {
        name: 'Бүртгэл үүсгэх',
        href: '/register',
        description: 'Шинээр бүртгэл үүсгэн манай community-д нэгдэх боломжтой.',
        icon: UserPlus,
    }
]

export default function NotFound() {
    return (
        <div className='mt-6 md:mt-20'>
            <main className="mx-auto w-full max-w-7xl px-6 pt-10 lg:px-8 pb-20">
                <div className="mx-auto mt-8 md:mt-20 max-w-2xl text-center sm:mt-24">
                    <p className="text-base font-semibold leading-8 text-dark-100">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-dark-200 sm:text-5xl">Хуудас олдсонгүй</h1>
                    <p className="mt-4 text-base leading-7 text-dark-300 sm:mt-6 sm:text-lg sm:leading-8">
                        Уучлаарай, таны хайсан зүйл олдсонгүй.
                    </p>
                </div>
                <div className="mx-auto mt-8 md:mt-16 flow-root max-w-lg sm:mt-20">
                    <h2 className="sr-only">Popular pages</h2>
                    <ul role="list" className="-mt-6 divide-y divide-dark-900/5 border-b border-dark-900/5">
                        { links.map((link, linkIdx) => (
                            <li key={linkIdx} className="relative flex gap-x-6 py-6">
                                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-sm ring-1 ring-gray-900/10">
                                    <link.icon className="h-6 w-6 text-dark-100" aria-hidden="true" />
                                </div>
                                <div className="flex-auto">
                                    <h3 className="text-sm font-semibold leading-6 text-dark-100">
                                        <a href={link.href}>
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            {link.name}
                                        </a>
                                    </h3>
                                    <p className="mt-2 text-sm leading-6 text-dark-400">{link.description}</p>
                                </div>
                                <div className="flex-none self-center">
                                    <ChevronRightIcon className="h-5 w-5 text-dark-100" aria-hidden="true" />
                                </div>
                            </li>
                        )) }
                    </ul>
                    <div className="mt-10 flex justify-center">
                        <a href="/" className="text-sm font-semibold leading-6 text-dark-100">
                            <span aria-hidden="true" className='mr-1'>&larr;</span>
                            Нүүр хуудас
                        </a>
                    </div>
                </div>
            </main>
        </div>
    )
}