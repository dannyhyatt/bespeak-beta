import { useState } from "react";
import { ActionButtonCSS, ButtonCSS } from "./CSSConsts";
import { createReadlist } from "@/utils/supabase/api/readlists";
import { createClient } from "@/utils/supabase/client";

export default function NewListModal({ onListCreated, onCancel } : { onListCreated: (name: string) => void, onCancel: () => void}) {

  const [name, setName] = useState<string>('')

  const createList = async () => {
    const readList = await createReadlist(createClient(), name)
    onListCreated(readList.name)
  }

  return (
    <>
      <div
        onClick={onCancel}
        className="fixed inset-0 z-0 bg-black bg-opacity-50 left-[-1000px] right-[-1000px] top-[-1000px] bottom-[-1000px] flex items-center justify-center">
        <div onClick={(e) => e.stopPropagation()} className="bg-background rounded-md p-4 z-10">
          <h1 className="text-2xl font-bold ml-2">New List</h1>
          <span className="flex my-2 gap-2">
            <input 
              value={name} onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border-2 rounded-md bg-background" placeholder="List title" />
            <button className={ActionButtonCSS} onClick={createList}>Create</button>
          </span>
        </div>
      </div>
    </>
  );

}