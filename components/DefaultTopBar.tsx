import Profile from '@/utils/supabase/api/profile';
import AccountButton from './AccountButton'
import BespeakLogo from './BespeakLogo'
import SearchBar from './SearchBar';

export default function DefaultTopBar({
  isSupabaseConnected,
  profile,
  initialSearchQuery
}: {
  isSupabaseConnected: boolean
  profile?: Profile
  initialSearchQuery?: string
}) {

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 min-h-16 sticky top-0 bg-background z-10">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm flex-wrap gap-y-3">
        <BespeakLogo />
        <span className="flex gap-4 flex-grow justify-end sm:pl-4">
          <SearchBar initialSearchQuery={initialSearchQuery} />
          <AccountButton profile={profile} />
        </span>
      </div>
    </nav>
  );
}