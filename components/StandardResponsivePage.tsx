import Profile from "@/utils/supabase/api/profile";
import DefaultFooter from "./DefaultFooter";
import DefaultTopBar from "./DefaultTopBar";

interface StandardResponsivePageProps {
  children: React.ReactNode;
  isSupabaseConnected: boolean;
  profile?: Profile;
}

const StandardResponsivePage = (props: StandardResponsivePageProps) => {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <DefaultTopBar isSupabaseConnected={props.isSupabaseConnected} profile={props.profile} />

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3 w-full">
        <main className="flex-1 flex flex-col m-auto">
          {props.children}
        </main>
      </div>

      <DefaultFooter />
    </div>
  )
}

export default StandardResponsivePage