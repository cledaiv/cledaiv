
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import ProfileForm from '@/components/profile/ProfileForm';
import ProfileHeader from '@/components/profile/ProfileHeader';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/common/Navbar';

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-8 flex justify-center items-center">
          <div className="animate-pulse flex flex-col items-center p-8">
            <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
            <div className="h-4 w-48 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 w-32 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated
    window.location.href = '/auth';
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <ProfileHeader user={user} />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Informations du profil</h2>
              <ProfileForm user={user} />
            </Card>
          </div>
          
          <div className="md:col-span-1">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-muted-foreground">Projets créés</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-muted-foreground">Projets terminés</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Membre depuis</span>
                  <span className="font-medium">
                    {user.created_at 
                      ? new Date(user.created_at).toLocaleDateString('fr-FR') 
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
