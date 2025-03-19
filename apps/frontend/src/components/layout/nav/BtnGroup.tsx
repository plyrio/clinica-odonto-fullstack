import BtnMenu from './BtnMenu';
import UserMenu from './user/UserMenu';
import { auth } from '@/auth';
import { IconLoader2 } from '@tabler/icons-react';

export default async function BtnGroup() {
 const session =
  await auth();
 const user =
  session?.user;
 
 return user ? (<UserMenu user={user}/>) : (<BtnMenu />)

}
