import React from 'react'

export default function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-1 py-0.5 text-sm rounded-md bg-foreground/20 font-light mx-1.5 text-foreground">{children}</span>
  )
}
