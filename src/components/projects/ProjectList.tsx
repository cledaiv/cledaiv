
import React from 'react';
import { useProjects, Project } from '@/hooks/use-projects';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'draft':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Non définie';
  return new Date(dateString).toLocaleDateString('fr-FR');
};

export const ProjectList = () => {
  const { projects, loading } = useProjects();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="w-full">
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-1/4" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium mb-2">Aucun projet pour le moment</h3>
        <p className="text-muted-foreground mb-4">Commencez par créer votre premier projet</p>
        <Button onClick={() => navigate('/projects/new')}>Créer un projet</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project: Project) => (
        <Card key={project.id} className="w-full hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{project.title}</CardTitle>
              <Badge className={getStatusColor(project.status)}>
                {project.status === 'in_progress' ? 'En cours' : 
                 project.status === 'completed' ? 'Complété' : 
                 project.status === 'draft' ? 'Brouillon' : 
                 project.status === 'pending' ? 'En attente' : project.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {project.description || 'Aucune description'}
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span>Début: {formatDate(project.start_date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <ClockIcon className="h-4 w-4 text-muted-foreground" />
                <span>Deadline: {formatDate(project.deadline)}</span>
              </div>
              <div className="flex items-center gap-1">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                <span>
                  {project.freelancer_id ? 'Freelance assigné' : 'Pas de freelance'}
                </span>
              </div>
              {project.budget && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">
                    Budget: {project.budget} {project.currency}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              onClick={() => navigate(`/projects/${project.id}`)}
              className="w-full"
            >
              Voir les détails
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
