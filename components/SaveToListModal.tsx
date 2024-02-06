import Readlist, { ReadlistWithCheck, addToReadlist, getReadlists, getReadlistsWithChecks } from "@/utils/supabase/api/readlists";
import { createClient } from "@/utils/supabase/client";
import { IconCheckbox, IconCirclePlus, IconSquare, IconSquareCheck } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import NewListModal from "./NewListModal";

export default function SaveToListModal({ onDismiss, postID, userID } : { onDismiss: () => void, postID: string, userID: string | undefined }) {

  const [readlists, setReadlists] = useState<ReadlistWithCheck[]>([])

  const [newListModalOpen, setNewListModalOpen] = useState<boolean>(false)

  const init = async () => {
    if(!userID) return
    const res = await getReadlistsWithChecks(createClient(), postID);
    setReadlists(res)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <div
        onClick={onDismiss}
        className="fixed inset-0 z-0 bg-black bg-opacity-50 left-[-1000px] right-[-1000px] top-[-1000px] bottom-[-1000px] flex items-center justify-center">
        <div onClick={(e) => e.stopPropagation()} className="bg-background rounded-md p-4 z-10 min-w-[320px]">

          {
            userID ? 
              <>
                <h1 className="text-2xl font-bold ml-2 mb-6">Save to List</h1>
                <ul>
                  <li
                    onClick={() => setNewListModalOpen(true)}
                    className="flex items-center p-2 hover:bg-gray-200 hover:dark:bg-gray-700 rounded-md gap-2 cursor-pointer"
                  >
                    <IconCirclePlus /> New List
                  </li>
                  {readlists.map(list => (
                    <SaveListItem key={list.id} readlist={list} postID={postID} />
                  ))}
                </ul>
              </>
              : 
              <>
                <h1 className="text-xl font-bold ml-2">
                  <Link href={`/login?redirectTo=${location.href}`} className="underline">
                    Sign in
                  </Link> to save to a list
                </h1>
              </>
          }

        </div>
      </div>
      { newListModalOpen && 
        <NewListModal
          onListCreated={(newReadlist) => {
            setNewListModalOpen(false)
            setReadlists([{
              ...newReadlist,
              already_in_list: false
            }, ...readlists])
          }} 
          onCancel={() => setNewListModalOpen(false)}
        />
      }
    </>
  );
}

function SaveListItem({ readlist, postID } : { readlist: ReadlistWithCheck, postID: string }) {

  const [checked, setChecked] = useState<boolean>(readlist.already_in_list)

  const saveItem = async () => {
    if(checked) {
      // remove from list
    } else {
      // add to list
      await addToReadlist(createClient(), readlist.id, postID)
      setChecked(true)
    }
  }

  return (
    <span
      onClick={saveItem}
      className="flex items-center cursor-pointer p-2 hover:bg-gray-200 hover:dark:bg-gray-700 rounded-md gap-2"
    >
      {checked ? 
        <IconSquareCheck /> :
        <IconSquare />
      } {readlist.name}
    </span>
  );
}