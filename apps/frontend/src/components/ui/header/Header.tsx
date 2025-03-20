import NavLinks from './NavLinks';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import SignIn from '../button/ButtonSignIn';

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
                                <SignIn
                                    provider="google"
                                    className="relative flex items-center rounded-md px-5 py-2.5 text-sm font-medium shadow-lg bg-blue-600 text-white"
                                />


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
