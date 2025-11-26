import React, { ButtonHTMLAttributes } from 'react'

export default function Button({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button {...props} className="px-2 py-1 rounded-md bg-foreground text-background mt-4 hover:bg-foreground/80 transition-colors duration-300 cursor-pointer flex gap-2 items-center w-fit">{children}</button>
    )
}
