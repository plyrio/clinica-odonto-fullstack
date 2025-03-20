import { signIn } from "@/auth"

export default function SignIn({ provider, ...props }: { provider: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <form
            action={async () => {
                "use server"
                await signIn(provider)
            }}
        >

            <button {...props} type="submit">Entrar</button>
        </form>
    )
} 