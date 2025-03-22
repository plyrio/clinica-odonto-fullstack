import { IconBell } from '@tabler/icons-react'
import Link from 'next/link'
import React from 'react'
import { User } from 'next-auth';


type Props = {
 user: User;
};

export default function NotifyBell ({user}: Props) {
  return (
      <Link href={'#'} className=''>
          <div className="flex items-center relative">
              <IconBell stroke={2} className="text-gray-700" />
              <div className=" top-0 right-0 -mt-2 -mr-2 w-5 h-5 bg-red-600 rounded-full flex justify-center items-center text-xs text-white">
                  4
              </div>
          </div>
      </Link>
  )
}
