'use client';
import { SignIn } from '@/components/session/auth-components';
import ButtonDefault from '@/components/utils/ButtonDefault';

export default function BtnMenu() {
 return (
  <div className="md:flex items-center sm:gap-4">
   <SignIn
    provider="google"
    className="relative flex items-center rounded-md px-5 py-2.5 text-sm font-medium shadow-lg bg-blue-600 text-white"
   />

   <ButtonDefault
    href="#"
    variant="white-blue"
    text="Registrar"
    className="hidden border border-4 md:flex items-center  my-auto rounded-md px-5 py-2.5 text-sm font-medium shadow-btn bg-gray-100"
   />
  </div>
 );
}
