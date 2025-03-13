"use client"
import Link from "next/link";
import Image from "next/image";
import { LOGO, CLINIC_INFO } from "@/data/Data";
import { usePathname } from "next/navigation";


export default function Header () {
  return (
    
    	<header className='bg-white sticky top-0 z-50 shadow-header '>
				<div className='mx-auto container px-4 sm:px-6 lg:px-8'>
					<div className='flex h-16 items-center justify-between'>
						<div className='h-full flex md:items-center md:gap-12'>
						<Link href="/" className="flex text-teal-600 items-center">
								<span className='sr-only'>	Home	</span>
								<Image src={LOGO} height={50} width={50} className="h-8 w-auto" alt="Logo da Clinica Odonto" />
						</Link>

						</div>
						<div className='flex items-center md:gap-12 h-full'>
							<nav
								aria-label='Global'
								className='hidden md:flex bg-amber-500 h-full items-center justify-center hover:border-b-blue-600'>
								<ul className='flex items-center gap-6 text-sm'>
									<li>
										<a
											className='text-gray-500 transition hover:text-gray-500/75'
											href='#'>
											{" "}
											About{" "}
										</a>
									</li>

									<li>
										<a
											className='text-gray-500 transition hover:text-gray-500/75'
											href='#'>
											{" "}
											Careers{" "}
										</a>
									</li>

									<li>
										<a
											className='text-gray-500 transition hover:text-gray-500/75'
											href='#'>
											{" "}
											History{" "}
										</a>
									</li>

									<li>
										<a
											className='text-gray-500 transition hover:text-gray-500/75'
											href='#'>
											{" "}
											Services{" "}
										</a>
									</li>

									<li>
										<a
											className='text-gray-500 transition hover:text-gray-500/75'
											href='#'>
											{" "}
											Projects{" "}
										</a>
									</li>

									<li>
										<a
											className='text-gray-500 transition hover:text-gray-500/75'
											href='#'>
											{" "}
											Blog{" "}
										</a>
									</li>
								</ul>
							</nav>

							<div className='flex items-center gap-4'>
								<div className='sm:flex sm:gap-4'>
									<a
										className='rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm'
										href='#'>
										Login
									</a>

									<div className='hidden sm:flex'>
										<a
											className='rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600'
											href='#'>
											Register
										</a>
									</div>
								</div>

								<div className='block md:hidden'>
									<button className='rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='size-5'
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
    
    )
}
