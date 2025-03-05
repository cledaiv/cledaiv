import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Clock, Edit, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const taskFormSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().optional(),
  status: z.string().default('pending'),
  due_date: z.date().optional().nullable(),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

const formatDate = (dateString: string | null) => {
  if (!dateString) return '';
  return format(new Date(dateString), 'd MMMM yyyy', { locale: fr });
};

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return <Badge className="bg-green-100 text-green-800">Terminée</Badge>;
    case 'in_progress':
      return <Badge className="bg-blue-100 text-blue-800">En cours</Badge>;
    case 'pending':
      return <Badge className="bg-yellow-100 text-yellow-800">À faire</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export const ProjectTasks = ({ projectId }: { projectId: string }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'pending',
      due_date: null,
    },
  });

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('project_tasks')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les tâches',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  useEffect(() => {
    if (editingTask) {
      form.reset({
        title: editingTask.title,
        description: editingTask.description || '',
        status: editingTask.status,
        due_date: editingTask.due_date ? new Date(editingTask.due_date) : null,
      });
    } else {
      form.reset({
        title: '',
        description: '',
        status: 'pending',
        due_date: null,
      });
    }
  }, [editingTask, form]);

  // Configuration d'un canal en temps réel pour les tâches
  useEffect(() => {
    const tasksChannel = supabase
      .channel(`project-${projectId}-tasks`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'project_tasks',
          filter: `project_id=eq.${projectId}`
        },
        (payload) => {
          console.log('Task change detected:', payload);
          fetchTasks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(tasksChannel);
    };
  }, [projectId]);

  const onSubmit = async (values: TaskFormValues) => {
    try {
      const taskData = {
        ...values,
        title: values.title,
        due_date: values.due_date ? values.due_date.toISOString() : null,
        project_id: projectId,
      };

      if (editingTask) {
        const { error } = await supabase
          .from('project_tasks')
          .update(taskData)
          .eq('id', editingTask.id);

        if (error) throw error;

        toast({
          title: 'Tâche mise à jour',
          description: 'La tâche a été mise à jour avec succès',
        });
      } else {
        const { error } = await supabase
          .from('project_tasks')
          .insert([taskData]);

        if (error) throw error;

        toast({
          title: 'Tâche créée',
          description: 'La tâche a été créée avec succès',
        });
      }

      setEditingTask(null);
      setIsDialogOpen(false);
      fetchTasks();
    } catch (err) {
      console.error('Error saving task:', err);
      toast({
        title: 'Erreur',
        description: 'Impossible de sauvegarder la tâche',
        variant: 'destructive',
      });
    }
  };

  const handleEditTask = (task: any) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('project_tasks')
        .update({ status: newStatus })
        .eq('id', taskId);

      if (error) throw error;

      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ));

      toast({
        title: 'Statut mis à jour',
        description: 'Le statut de la tâche a été mis à jour',
      });
    } catch (err) {
      console.error('Error updating task status:', err);
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour le statut',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-5 w-1/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Tâches du projet</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingTask(null)}>
              <PlusCircle className="h-4 w-4 mr-2" /> Nouvelle tâche
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTask ? 'Modifier la tâche' : 'Créer une nouvelle tâche'}
              </DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre</FormLabel>
                      <FormControl>
                        <Input placeholder="Titre de la tâche" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Description de la tâche" 
                          className="min-h-[100px]" 
                          {...field} 
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Statut</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un statut" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pending">À faire</SelectItem>
                          <SelectItem value="in_progress">En cours</SelectItem>
                          <SelectItem value="completed">Terminée</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="due_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Échéance</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className="w-full pl-3 text-left font-normal"
                            >
                              {field.value ? (
                                format(field.value, "d MMMM yyyy", { locale: fr })
                              ) : (
                                <span className="text-muted-foreground">Sélectionner une date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button type="submit">
                    {editingTask ? 'Mettre à jour' : 'Créer'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-10 border rounded-lg">
          <p className="text-muted-foreground mb-2">Aucune tâche pour ce projet</p>
          <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" /> Ajouter une tâche
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="hover:shadow-sm transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{task.title}</CardTitle>
                  {getStatusBadge(task.status)}
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-muted-foreground mb-2 line-clamp-2">
                  {task.description || 'Aucune description'}
                </p>
                {task.due_date && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    Échéance: {formatDate(task.due_date)}
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-0 flex justify-between">
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditTask(task)}
                  >
                    <Edit className="h-4 w-4 mr-1" /> Modifier
                  </Button>
                  {task.status !== 'completed' && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleStatusChange(task.id, 'completed')}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" /> Marquer comme terminée
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
