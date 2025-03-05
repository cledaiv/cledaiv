
import React from 'react';
import { useProjects } from '@/hooks/use-projects';
import { useAuth } from '@/context/AuthContext';

const ProjectStats: React.FC = () => {
  const { projects, loading } = useProjects();
  const { user } = useAuth();
  
  if (loading || !user) {
    return <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
    </div>;
  }
  
  // Filtrer les projets en fonction du type de compte
  const userProjects = projects.filter(project => {
    if (user.user_metadata?.account_type === 'client') {
      return project.client_id === user.id;
    } else {
      return project.freelancer_id === user.id;
    }
  });
  
  const completedProjects = userProjects.filter(
    project => project.status === 'completed'
  ).length;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b pb-2">
        <span className="text-muted-foreground">Projets créés</span>
        <span className="font-medium">{userProjects.length}</span>
      </div>
      <div className="flex justify-between items-center border-b pb-2">
        <span className="text-muted-foreground">Projets terminés</span>
        <span className="font-medium">{completedProjects}</span>
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
  );
};

export default ProjectStats;
