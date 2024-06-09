import { OrganizationSwitcher, SignedIn, SignOutButton } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { dark } from '@clerk/themes';

const Topbar = () => {
  return (
    <nav className='topbar'>
      <Link href={"/"} className='flex items-center gap-4'>
        <Image src={"/assets/logo_transparent.png"} alt='logo' width={155} height={155} />
      </Link>

      <div className='flex items-center gap-1 text-white'>
        <div className='block md:hidden'>
          <SignedIn>
            <SignOutButton>
              <div className='flex cursor-pointer'>
                <LogOut className='text-white' />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <OrganizationSwitcher appearance={{ 
          baseTheme: dark
        }} />
      </div>
    </nav>
  )
}

export default Topbar