import NavLinks from './nav/NavLinks';

import Logo from './nav/Logo';
import Dropmenu from './nav/DropNavMenu';
import BtnMenu from './nav/BtnMenu';
import UserMenu from './nav/UserMenu';

export default function Header() {
    const user = true;
    return (
        <header className='bg-white sticky top-0 z-50 shadow-header '>
            <div className='mx-auto container px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 items-center justify-between'>
                    <div className='h-full flex items-center md:gap-12'>
                        <Logo />
                    </div>
                    <div className='flex items-center h-full md:w-full'>
                        <NavLinks />
                        <div className='flex items-center gap-4'>
                            {user ? (<UserMenu />) : (<BtnMenu />)}
                            
                            

                            <div className='flex md:hidden'>
                                <Dropmenu/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
