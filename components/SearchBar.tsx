'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ initialSearchQuery }: { initialSearchQuery?: string}) {
  
  const rounter = useRouter()

  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery ? decodeURI(initialSearchQuery) : '')

  return (
    <div className="relative min-w-[16ch] transition-all">
      <input value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder="Search" 
        onKeyUp={(e) => { if(e.key == 'Enter' && searchQuery) rounter.push(`/search/${e.currentTarget.value}`) }}
        className="input-with-search border absolute right-0 h-full border-gray-300 focus-within:w-[24ch] rounded-md p-2 pr-8 transition-all" />
      <img src="/images/icons/search.svg" className="absolute right-2 top-0 mt-[11px] w-4 h-4 z-10" alt="Search" />
    </div>
  );
}