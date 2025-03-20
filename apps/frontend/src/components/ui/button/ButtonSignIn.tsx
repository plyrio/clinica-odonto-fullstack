"use client"
import { signIn } from "next-auth/react"

export default function SignIn({ provider, ...props }: { provider: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (


            <button onClick={() => signIn(provider) }{...props} type="submit">Entrar</button>
      
    )
} 