"use client"
import { IconArrowBackUp } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";
import { signOut } from "next-auth/react"

type btnProps = {
    className?: string
    text: string
    icon?: boolean
}


export default function SignOut  ({ className, text, icon = false, ...props }: btnProps & React.ButtonHTMLAttributes<HTMLButtonElement>)  {
    return (

            <button onClick={() => signOut()} className={twMerge(className)} {...props} type="submit">
                {icon ? (<IconArrowBackUp stroke={1} />) : (null)}
                Sair
            </button>

    )
}