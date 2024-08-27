"use client"

import React, { ReactNode } from 'react'
import { ComponentProps } from "react";
import Link from "next/link";
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';


function Navigation({children}: {children: ReactNode}) {
    return (
        <div className='flex justify-center px-4 bg-primary text-primary-foreground'>
            {children}
        </div>
    )
}

export default Navigation

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {

    const pathname = usePathname()
    return (
        <Link {...props} className={cn("p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-foreground", 
            pathname === props.href && "bg-background text-foreground"
        )} />
    )
}