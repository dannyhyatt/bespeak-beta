import Profile from '@/utils/supabase/api/profile';
import AccountButton from './AccountButton'
import BespeakLogo from './BespeakLogo'

export default function DefaultTopBar({
  isSupabaseConnected,
  profile
}: {
  isSupabaseConnected: boolean
  profile?: Profile
}) {
  console.log('is supabase connected?', isSupabaseConnected);
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
        <BespeakLogo />
        {<AccountButton profile={profile} />}
      </div>
    </nav>
  );
}