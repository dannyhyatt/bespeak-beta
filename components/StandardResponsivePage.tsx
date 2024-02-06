import Profile from "@/utils/supabase/api/profile";
import DefaultFooter from "./DefaultFooter";
import DefaultTopBar from "./DefaultTopBar";

interface StandardResponsivePageProps {
  children: React.ReactNode;
  isSupabaseConnected: boolean;
  profile?: Profile;
  className?: string;
  parentClassName?: string;
  initialSearchQuery?: string;
  animateIn?: boolean;
}

const StandardResponsivePage = (props: StandardResponsivePageProps) => {

  const animateIn = props.animateIn ? 'animate-in opacity-0' : ''

  return (
    <div className="flex-1 w-full flex flex-col sm:gap-20 gap-5 items-center">
      <DefaultTopBar isSupabaseConnected={props.isSupabaseConnected} profile={props.profile} initialSearchQuery={props.initialSearchQuery} />

      <div className={`${props.parentClassName} ${props.animateIn} flex-1 flex flex-col gap-20 max-w-4xl px-3 w-full`}>
        <main className={`flex-1 flex flex-col m-auto w-full sm:w-8/12 lg:w-6/12 ${props.className}`}>
          {props.children}
        </main>
      </div>

      <DefaultFooter />
    </div>
  )
}

export default StandardResponsivePage