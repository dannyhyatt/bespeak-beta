import { PostWithRevision } from "@/utils/supabase/api/post";

// where i left off
export default function CollaboratorsModal({ post } : { post?: PostWithRevision}) {
  return (
    <div className="absolute top-[-1000px] left-[-1000px] right-[-1000px] bottom-[-1000px] flex justify-center items-center bg-[#000000aa]">
      <div className="bg-background text-foreground rounded-lg p-4"> 
        <h1 className="text-2xl font-semibold mb-2">Collaborators</h1>
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <img className="h-8 rounded-full" src="https://avatars.githubusercontent.com/u/37166616?v=4" />
            <span className="ml-2">User</span>
          </div>
        </div>
      </div>
    </div>
  )
}