import Image from 'next/image'
import React from 'react'

export default function HeroCarousel() {
  return (
    <section className='w-full overflow-x-auto no-scrollbar flex justify-start' >
      <div className='group'>
        {
          [1, 2, 3, 4].map((i) => (
            <Image key={i} src={`/assets/hero-carousel-${i}.webp`} alt={`hero-carousel-${i}`} className='w-full h-[400px] ' width={400} height={200} />
          ))
        }
      {/* </div>
      <div className='group bg-amber-400'> */}
        {
          [1, 2, 3, 4].map((i) => (
            <Image key={i} src={`/assets/hero-carousel-${i}.webp`} alt={`hero-carousel-${i}`} className='w-full h-[400px] shrink-0' width={400} height={200} />
          ))
        }
      </div>
    </section>
  )
}
