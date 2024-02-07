'use client'

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SearchBar({ initialSearchQuery }: { initialSearchQuery?: string}) {
  
  const rounter = useRouter()
  const searchInput = React.useRef<HTMLInputElement>(null)

  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery ? decodeURI(initialSearchQuery) : '')

  return (
    <div className={`flex justify-between sm:min-w-[16ch] 
                     focus-within:min-w-[24ch] focus-within:[&>input]:pl-2 
                    [&>input:not(:placeholder-shown)]:min-w-[24ch] [&>input:not(:placeholder-shown)]:pl-2 
                     focus-within:[&>input::placeholder]:opacity-100 [&>input::placeholder]:opacity-0 
                     sm:[&>input::placeholder]:opacity-100 max-w-sm 
                     transition-all border border-gray-300 rounded-md`}>
      <input value={searchQuery} id="search-bar-input" ref={searchInput}
        onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search" 
        onKeyUp={(e) => { if(e.key == 'Enter' && searchQuery) rounter.push(`/search/${e.currentTarget.value}`) }}
        className="input-with-search h-full sm:p-2 transition-all bg-transparent focus:outline-none grow min-w-0 w-0" />
      <img
        src="/images/icons/search.svg" 
        onClick={(e) => {
          if(searchQuery) rounter.push(`/search/${searchQuery}`)
          else searchInput.current?.focus()
        }}
        className="mt-[11px] w-4 h-4 m-1 mr-2 ml-2 dark:invert cursor-pointer" alt="Search" 
      />
    </div>
  );
}