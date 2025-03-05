
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  FilePlus, 
  MessageSquare, 
  MoreHorizontal, 
  PlusCircle, 
  Edit, 
  Trash2,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProjectTasks } from './ProjectTasks';
import { ProjectFiles } from './ProjectFiles';
import { ProjectChat } from './ProjectChat';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Non définie';
  return new Date(dateString).toLocaleDateString('fr-FR');
};

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return <Badge className="bg-green-100 text-green-800">Terminé</Badge>;
    case 'in_progress':
      return <Badge className="bg-blue-100 text-blue-800">En cours</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
    case 'draft':
      return <Badge className="bg-gray-100 text-gray-800">Brouillon</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setProject(data);
      } catch (err) {
        console.error('Error fetching project details:', err);
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les détails du projet',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [id, toast]);

  // Configurer l'écoute des mises à jour en temps réel
  useEffect(() => {
    if (!id) return;

    const projectsChannel = supabase
      .channel(`project-${id}`)
      .on('postgres_changes', 
        { event: 'UPDATE', schema: 'public', table: 'projects', filter: `id=eq.${id}` },
        (payload) => {
          console.log('Project updated:', payload);
          setProject(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(projectsChannel);
    };
  }, [id]);

  const handleDeleteProject = async () => {
    if (!id) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Projet supprimé',
        description: 'Le projet a été supprimé avec succès',
      });
      navigate('/projects');
    } catch (err) {
      console.error('Error deleting project:', err);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le projet',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-10 w-24" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/4 mb-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Projet non trouvé</h2>
          <p className="text-muted-foreground mb-4">
            Le projet que vous recherchez n'existe pas ou vous n'avez pas la permission d'y accéder.
          </p>
          <Button onClick={() => navigate('/projects')}>
            Retour à la liste des projets
          </Button>
        </div>
      </div>
    );
  }

  const isClient = user?.id === project.client_id;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{project.title}</h1>
        {isClient && (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(`/projects/${id}/edit`)}
            >
              <Edit className="h-4 w-4 mr-1" /> Modifier
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" /> Supprimer le projet
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Informations du projet</CardTitle>
            {getStatusBadge(project.status)}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            {project.description || 'Aucune description fournie.'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date de début</p>
                <p className="font-medium">{formatDate(project.start_date)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date limite</p>
                <p className="font-medium">{formatDate(project.deadline)}</p>
              </div>
            </div>

            {project.budget && (
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-sm text-muted-foreground">Budget</p>
                  <p className="font-medium">
                    {project.budget} {project.currency}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid grid-cols-3 w-full mb-4">
          <TabsTrigger value="tasks">Tâches</TabsTrigger>
          <TabsTrigger value="files">Fichiers</TabsTrigger>
          <TabsTrigger value="chat">Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks">
          <ProjectTasks projectId={id!} />
        </TabsContent>
        
        <TabsContent value="files">
          <ProjectFiles projectId={id!} />
        </TabsContent>
        
        <TabsContent value="chat">
          <ProjectChat projectId={id!} />
        </TabsContent>
      </Tabs>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce projet ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Toutes les tâches, fichiers et messages associés à ce projet seront également supprimés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProject} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
