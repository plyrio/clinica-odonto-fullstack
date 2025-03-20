import { IconArrowBackUp } from "@tabler/icons-react";
import { twMerge } from "tailwind-merge";
import { signOut } from "@/auth"

type btnProps = {
    className?: string
    text: string
    icon?: boolean
}


export default function SignOut  ({ className, text, icon = false, ...props }: btnProps & React.ButtonHTMLAttributes<HTMLButtonElement>)  {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <button className={twMerge(className)} {...props} type="submit">
                {icon ? (<IconArrowBackUp stroke={1} />) : (null)}
                Sair
            </button>

        </form>
    )
}