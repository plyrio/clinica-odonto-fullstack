import { IconArrowBackUp } from "@tabler/icons-react";
import { handleSignIn, handleSignOut } from "../../actions/auth-actions";
import { twMerge } from "tailwind-merge";

type btnProps = {
    className?: string
    text: string
    icon?: boolean
}

export function SignIn({provider, ...props} : {provider: string} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <form
            action={async () => {
              await handleSignIn(provider)
            }}
        >
            
            <button {...props} type="submit">Entrar</button>
        </form>
    )
} 

export const SignOut = ({className, text, icon = false, ...props}: btnProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <form
            action={async () => {
             await handleSignOut()
            }}
        >
            <button className={twMerge(className)} {...props} type="submit">
                {icon ? (<IconArrowBackUp stroke={1} />) : (null)}
                Sair
            </button>
            
        </form>
    )
}