import { SupabaseClient } from "@supabase/supabase-js";

export const Avatar = ({ username, supabase, className } : { username: string, supabase: SupabaseClient, className: string }) => {

  // console.log(`image('${supabase.storage.from('avatars').getPublicUrl(`${username}.png`).data.publicUrl}', 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png')`);

  const onError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null; // prevents looping
    e.currentTarget.src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";
  }

  return (
    <img 
      src={'https://img.google.com/vi/some-random-id/maxresdefault.jpg'}
      onError={(e) => onError(e)}
      className={className}
    />
  );

}