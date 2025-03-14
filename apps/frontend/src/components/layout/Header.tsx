import NavLinks from './header/NavLinks';
import ButtonDefault from '@/components/utils/ButtonDefault';
import Logo from './header/Logo';

export default function Header() {
 return (
  <header className='bg-white sticky top-0 z-50 shadow-header '>
   <div className='mx-auto container px-4 sm:px-6 lg:px-8'>
    <div className='flex h-16 items-center justify-between'>
     <div className='h-full flex items-center md:gap-12'>
      <Logo />
     </div>
     <div className='flex items-center md:gap-12  h-full'>
      <NavLinks />
      <div className='flex items-center gap-4'>
       <div className='sm:flex sm:gap-4'>
        <ButtonDefault
         href='#'
         text='Entrar'
         className='rounded-md px-5 py-2.5 text-sm font-medium shadow-sm'
        />

        <div className='hidden sm:flex'>
         {' '}
         <ButtonDefault
          href='#'
          variant='white-blue'
          text='Registrar'
          className='rounded-md px-5 py-2.5 text-sm font-medium shadow-sm bg-gray-100'
         />
        </div>
       </div>

       <div className='block md:hidden'>
        <button className='rounded-sm p-2 text-gray-700 transition hover:text-gray-600/75'>
         <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-6 rounded'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth='2'>
          <path
           strokeLinecap='round'
           strokeLinejoin='round'
           d='M4 6h16M4 12h16M4 18h16'
          />
         </svg>
        </button>
       </div>
      </div>
     </div>
    </div>
   </div>
  </header>
 );
}
