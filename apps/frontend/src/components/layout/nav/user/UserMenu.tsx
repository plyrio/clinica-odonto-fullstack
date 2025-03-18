'use client';
import React from 'react';
import {User} from 'next-auth';
import {useUserMenu} from '@/hooks/useUserMenu';
import DropUserMenu from './DropUserMenu';
import Link from 'next/link';
import {SignOut} from '@/components/session/auth-components';
import NotificationBell from './NotificationBell';

type Props = {
	user: User;
};

const userLinks = [
	{
		name:
			'Meu Perfil',
		href: '#',
	},
	{
		name:
			'Meus Agendamentos',
		href: '#',
	},
	{
		name:
			'Histórico de Consultas',
		href: '#',
	},
	{
		name:
			'Configurações da Conta',
		href: '#',
	},
];

export default function UserMenu({
	user,
}: Props) {
	const {
		menuOpenUser,
		menuRef,
	} = useUserMenu();

	return (
		<div className="flex items-center gap-4">
			<NotificationBell />
			<div
				ref={menuRef}
				className="relative md:flex "
			>
				<DropUserMenu
					user={user}
				/>
				<div
					className={`${
						menuOpenUser
							? 'absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg'
							: 'hidden'
					} `}
					role="menu"
				>
					<div className="p-2">
						{userLinks.map(
							(
								link,
								index
							) => (
								<Link
									key={index}
									href={
										link.href
									}
									className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
								>
									{link.name}
								</Link>
							)
						)}
					</div>

					<div className="p-2">
						<SignOut
							text="Sair"
							icon
							className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
