import { products } from '@/data/products'
import { useCartStore } from '@/store/cart-store'
import Image from 'next/image'
import React from 'react'

export default function ProductSection() {
  const addToCart = useCartStore((state) => state.addToCart)
  return (
    <section className='bg-white p-3 grid grid-cols-4 w-full gap-2'>
      {
        products.map(product => (
          <div key={product.id} className='flex flex-col items-center justify-center gap-2 p-4 text-center'>
            <Image src={product.image} alt={product.title} width={100} height={100} className='mb-4 w-[30%] hover:scale-105 cursor-pointer' />
            <span className='max-w-[60%]'>{product.title}</span>
            <span className='font-semibold'>₹{product.price}</span>
            <button onClick={() => addToCart(product)} className='bg-[#dbdbdb] px-2.5 py-1.5 rounded-lg hover:bg-[#c5c5c5] cursor-pointer'>Add to cart</button>
          </div>
        ))
      }
    </section>
  )
}
