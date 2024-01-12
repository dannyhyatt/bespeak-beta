import Profile from '@/utils/supabase/api/profile';
import AccountButton from './AccountButton'
import BespeakLogo from './BespeakLogo'
import SearchBar from './SearchBar';

export default function DefaultTopBar({
  isSupabaseConnected,
  profile
}: {
  isSupabaseConnected: boolean
  profile?: Profile
}) {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 sticky top-0 bg-background z-10">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <BespeakLogo />
        <span className="flex gap-2">
          <SearchBar />
          <AccountButton profile={profile} />
        </span>
      </div>
    </nav>
  );
}