'use client'
import { auth } from '@/auth'
import { useUserMenu } from '@/hooks/useUserMenu'
import Image from 'next/image'


export default function DropUserMenu() {
    const { toggleMenuUser} = useUserMenu()
    return (
        <button onClick={toggleMenuUser}
            type="button" aria-expanded='true'
            className="overflow-hidden rounded-full border-2 border-gray-300 shadow-inner flex items-center justify-center"
        >
            <span className="sr-only">Toggle dashboard menu</span>
            <Image alt='' src= "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" height={256} width={256} className='size-10 object-cover flex md:w-full' />
        </button>

    )
}
