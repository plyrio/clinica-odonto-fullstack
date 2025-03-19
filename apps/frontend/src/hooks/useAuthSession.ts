'use client';
import { useSession } from 'next-auth/react';

export function useAuthSession() {
 const {
  data: session,
 } = useSession();
 const user =
  session?.user;

 return user;
}
