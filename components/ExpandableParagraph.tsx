'use client'

import { IconArrowUp, IconChevronUp } from "@tabler/icons-react"
import { useState } from "react"

export default function ExpandableParagraph({ children, className, ...props }: { children: React.ReactNode, className?: string }) {

  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <p
      className={`${className} ${expanded ? '' : 'line-clamp-3'}`}
      {...props}
      onClick={() => { if (!expanded) setExpanded(true) }}
    >
      {children}
      {expanded &&
        <IconChevronUp className={`inline align-top bg-gray-200 dark:bg-gray-800 m-1 mt-0.5 rounded-md cursor-pointer`} onClick={e => setExpanded(false)} />
      }
    </p>
  )
}