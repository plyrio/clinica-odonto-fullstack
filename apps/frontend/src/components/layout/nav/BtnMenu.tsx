'use client'
import  { SignIn }  from "@/components/session/auth-components";
import ButtonDefault from "@/components/utils/ButtonDefault";

export default function BtnMenu () {
  return (
      <div className='md:flex sm:gap-4'>
          
          <SignIn provider='google' className='relative inline-block items-center rounded-md px-5 py-2.5 text-sm font-medium shadow-sm bg-blue-600 text-white' />

          <div className='hidden md:flex'>
              {' '}
              <ButtonDefault
                  href='#'
                  variant='white-blue'
                  text='Registrar'
                  className='rounded-md px-5 py-2.5 text-sm font-medium shadow-sm bg-gray-100'
              />
          </div>
      </div>
  )
}