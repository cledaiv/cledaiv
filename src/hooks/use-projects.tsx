
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

export type Project = {
  id: string;
  title: string;
  description: string | null;
  client_id: string;
  freelancer_id: string | null;
  status: string;
  budget: number | null;
  currency: string;
  start_date: string | null;
  deadline: string | null;
  created_at: string;
  updated_at: string;
};

export type ProjectTask = {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: string;
  assigned_to: string | null;
  due_date: string | null;
  created_at: string;
  updated_at: string;
};

export type ProjectComment = {
  id: string;
  project_id: string;
  task_id: string | null;
  user_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type ProjectFile = {
  id: string;
  project_id: string;
  task_id: string | null;
  user_id: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  file_type: string | null;
  created_at: string;
};

export type ProjectMessage = {
  id: string;
  sender_id: string;
  recipient_id: string;
  project_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchProjects = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Fetch projects where the user is either the client or the freelancer
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .or(`client_id.eq.${user.id},freelancer_id.eq.${user.id}`);
      
      if (error) throw error;
      
      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les projets',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          ...projectData,
          client_id: user.id, // L'utilisateur actuel est le client qui crée le projet
        })
        .select();
      
      if (error) throw error;
      
      // Mettre à jour l'état local avec le nouveau projet
      if (data && data[0]) {
        setProjects([...projects, data[0]]);
        toast({
          title: 'Succès',
          description: 'Projet créé avec succès',
        });
        return data[0];
      }
      
      return null;
    } catch (err) {
      console.error('Error creating project:', err);
      toast({
        title: 'Erreur',
        description: 'Impossible de créer le projet',
        variant: 'destructive',
      });
      return null;
    }
  };

  const updateProject = async (projectId: string, updateData: Partial<Project>) => {
    if (!user) return false;
    
    try {
      const { error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', projectId);
      
      if (error) throw error;
      
      // Mettre à jour l'état local
      setProjects(projects.map(project => 
        project.id === projectId ? { ...project, ...updateData } : project
      ));
      
      toast({
        title: 'Succès',
        description: 'Projet mis à jour avec succès',
      });
      
      return true;
    } catch (err) {
      console.error('Error updating project:', err);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le projet',
        variant: 'destructive',
      });
      return false;
    }
  };

  const fetchProjectTasks = async (projectId: string) => {
    if (!user) return [];
    
    try {
      const { data, error } = await supabase
        .from('project_tasks')
        .select('*')
        .eq('project_id', projectId);
      
      if (error) throw error;
      
      return data || [];
    } catch (err) {
      console.error('Error fetching project tasks:', err);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les tâches du projet',
        variant: 'destructive',
      });
      return [];
    }
  };

  const createProjectTask = async (taskData: Omit<ProjectTask, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('project_tasks')
        .insert(taskData)
        .select();
      
      if (error) throw error;
      
      toast({
        title: 'Succès',
        description: 'Tâche créée avec succès',
      });
      
      return data?.[0] || null;
    } catch (err) {
      console.error('Error creating project task:', err);
      toast({
        title: 'Erreur',
        description: 'Impossible de créer la tâche',
        variant: 'destructive',
      });
      return null;
    }
  };

  useEffect(() => {
    if (user) {
      fetchProjects();
    }
  }, [user]);

  // Mise en place des listeners pour les mises à jour en temps réel
  useEffect(() => {
    if (!user) return;

    // S'abonner aux changements de projets en temps réel
    const projectsChannel = supabase
      .channel('projects-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'projects' },
        (payload) => {
          console.log('Changement en temps réel pour les projets:', payload);
          // Rafraîchir la liste des projets
          fetchProjects();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(projectsChannel);
    };
  }, [user]);

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    fetchProjectTasks,
    createProjectTask,
  };
};
