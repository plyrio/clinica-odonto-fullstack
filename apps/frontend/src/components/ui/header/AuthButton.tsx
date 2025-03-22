'use client';
import UserMenu from './UserMenu';
import SignIn from '../button/ButtonSignIn';
import { useSession } from 'next-auth/react';
import { IconLoader2 } from '@tabler/icons-react';
import NotifyBell from './NotifyBell';

export default function AuthButton() {
    const {
        data: session,
        status,
    } = useSession();
    const user =
        session?.user;

    if (
        status ===
        'loading'
    ) {
        return (
            <div className="flex items-center justify-center h-full w-full">
                <IconLoader2
                    stroke={2}
                    className=" flex justify-center bg-transparent text-blue-600 animate-spin"
                    size={32}
                />
            </div>
        );
    }

    return (
        <>
            {user ? (
                <>
                    
                    <UserMenu user={user} />
                </>

            ) : (
                <SignIn
                    provider="google"
                    className="relative flex items-center rounded-md px-5 py-2.5 text-sm font-medium shadow-lg bg-blue-600 text-white"
                />
            )}
        </>
    );
}
