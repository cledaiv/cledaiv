
import React from 'react';
import { User } from '@supabase/supabase-js';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  // Get display name from user metadata or fallback to email
  const displayName = user.user_metadata?.full_name || user.email || 'Utilisateur';
  const avatarUrl = user.user_metadata?.avatar_url;
  const initials = displayName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      <Avatar className="w-24 h-24">
        <AvatarImage src={avatarUrl} alt={displayName} />
        <AvatarFallback className="text-xl">{initials}</AvatarFallback>
      </Avatar>
      
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold">{displayName}</h1>
        <p className="text-muted-foreground mt-1">{user.email}</p>
        <div className="mt-4 inline-flex">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
            {user.user_metadata?.account_type === 'freelancer' ? 'Freelancer' : 'Client'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
