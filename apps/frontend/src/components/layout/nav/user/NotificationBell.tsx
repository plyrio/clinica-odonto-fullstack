import { IconBell, IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";

export default function NotificationBell() {
    return (

        <Link href={"#"}>
        <div className="flex items-center relative">
            <IconBell stroke={2} className='text-gray-700' />
            <div className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-red-600 rounded-full flex justify-center items-center text-xs text-white">4</div>
        </div>
    </Link>
        
            
            
        
    );
}