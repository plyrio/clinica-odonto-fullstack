import NavLinks from './NavLinks';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import AuthButton from './AuthButton';

export default function Header() {
 return (
  <header className="bg-white sticky top-0 z-50 shadow-header ">
   <div className="mx-auto container px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
     <div className="h-full flex items-center md:gap-12">
      <Logo />
     </div>
     <div className="flex items-center h-full md:w-full">
      <NavLinks />
      <div className="flex h-full items-center gap-4">
       <div className="md:flex items-center sm:gap-4">
        <AuthButton />
       </div>

       <div className="flex md:hidden">
        <MobileMenu />
       </div>
      </div>
     </div>
    </div>
   </div>
  </header>
 );
}
