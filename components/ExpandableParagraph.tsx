'use client'

import { useState } from "react"

export default function ExpandableParagraph({ children, className, ...props } : { children: React.ReactNode, className?: string }) {
  
    const [expanded, setExpanded] = useState<boolean>(false)
  
    return (
      <p 
        className={`${className} ${expanded ? '' : 'line-clamp-3'}`}
        {...props}
        onClick={() => { setExpanded(!expanded) }}
      >
        {children}
      </p>
    )
  }