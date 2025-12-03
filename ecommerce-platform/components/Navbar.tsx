import { CircleUser, Search, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function Navbar() {
  return (
    <header className='h-16 w-full flex items-center justify-center bg-white'>
      <nav className='h-full max-w-[80%] w-full flex items-center justify-between gap-3 py-3'>
        <Image src={'/assets/flipcart-logo.svg'} alt={"flipcart-logo"} width={100} height={100} className='h-full'/>
        <div className='flex-center gap-2 flex-1 bg-[#F0F5FF] h-full rounded-lg px-2'>
            <Search className='' size={20}/>
            <input className='flex-1 border-none outline-none' placeholder='Search for Products, Brands and More'/>
        </div>
        <div className='flex-center gap-2 rounded-lg hover:bg-blue-600 cursor-pointer h-full px-2'>
            <CircleUser size={20}/>
            <span>Login</span>
        </div>
        <div className='flex-center gap-2 rounded-lg hover:bg-blue-600 cursor-pointer h-full px-2'>
            <ShoppingCart size={20}/>
            <span>Cart</span>
        </div>
      </nav>
    </header>
  )
}
