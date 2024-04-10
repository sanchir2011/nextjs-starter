import { Github } from 'lucide-react'

export default function Home() {
    return (
        <div className="h-screen flex flex-col justify-center items-center gap-6 text-zinc-100">
            <h1 className="text-2xl md:text-4xl font-semibold">Next.js Starter Kit</h1>
            <div className="flex gap-1">
                <span>by</span>
                <a href='https://sanchir.dev' className="underline">Sanchir Enkhbold</a>
            </div>
            <div className="bg-zinc-800 px-4 py-3 rounded-xl">
                Start editing <code className="font-medium">app/page.js</code> and save to reload.
            </div>
            <a href='https://github.com/sanchir2011/nextjs-starter' className='flex gap-2 font-medium items-center' target='_blank'>
                <Github size={20} className="text-zinc-100" /> 
                <span>Github</span>
            </a>
        </div>
    );
}
