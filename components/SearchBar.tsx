'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ initialSearchQuery }: { initialSearchQuery?: string}) {
  
  const rounter = useRouter()

  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery ? decodeURI(initialSearchQuery) : '')

  return (
    <div className="relative min-w-[16ch] focus-within:flex-grow focus-within:min-w-[24ch] max-w-sm transition-all">
      <input value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search" 
        onKeyUp={(e) => { if(e.key == 'Enter' && searchQuery) rounter.push(`/search/${e.currentTarget.value}`) }}
        className="input-with-search border absolute right-0 left-0 top-0 bottom-0 h-full border-gray-300 rounded-md p-2 pr-8 transition-all bg-background" />
      <img src="/images/icons/search.svg" onClick={() => { if(searchQuery) rounter.push(`/search/${searchQuery}`) }}
        className="absolute right-2 top-0 mt-[11px] w-4 h-4 z-10 dark:invert cursor-pointer" alt="Search" />
    </div>
  );
}