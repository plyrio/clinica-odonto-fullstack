import NavLinks from "./NavLinks";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import AuthButton from "./AuthButton";
import { auth } from "@/auth";

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-header ">
      <div className="mx-auto container px-4 sm:px-6 lg:px-8">
        <div className="flex mx-auto h-16 items-center md:justify-evenly justify-between">
          <div className="h-full min-w-[160px] flex items-center md:gap-12">
            <Logo classNameImg="flex w-full" />
          </div>
          <div className="flex items-center h-full md:w-full">
            <NavLinks />
            <div className="flex h-full items-center gap-4">
              <div className="md:flex items-center sm:gap-4 min-w-[82px]">
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
