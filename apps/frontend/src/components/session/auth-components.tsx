import { handleSignIn, handleSignOut } from "../../actions/auth-actions";

export function SignIn({provider, ...props} : {provider: string} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <form
            action={async () => {
              await handleSignIn(provider)
            }}
        >
            <button {...props} type="submit">Sign In</button>
        </form>
    )
} 

export const SignOut = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <form
            action={async () => {
             await handleSignOut()
            }}
        >
            <button {...props} type="submit">Sign Out</button>
        </form>
    )
}