
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  UploadCloud, 
  File, 
  FileText, 
  FileImage, 
  FileArchive,
  Download,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
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

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getFileIcon = (fileType: string | null) => {
  if (!fileType) return <File className="h-8 w-8 text-blue-500" />;
  
  if (fileType.startsWith('image/')) {
    return <FileImage className="h-8 w-8 text-purple-500" />;
  } else if (fileType.includes('pdf') || fileType.includes('document')) {
    return <FileText className="h-8 w-8 text-red-500" />;
  } else if (fileType.includes('zip') || fileType.includes('compressed')) {
    return <FileArchive className="h-8 w-8 text-yellow-500" />;
  }
  
  return <File className="h-8 w-8 text-blue-500" />;
};

export const ProjectFiles = ({ projectId }: { projectId: string }) => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<any>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('project_files')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (err) {
      console.error('Error fetching files:', err);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les fichiers',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [projectId]);

  // Configuration d'un canal en temps réel pour les fichiers
  useEffect(() => {
    const filesChannel = supabase
      .channel(`project-${projectId}-files`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'project_files',
          filter: `project_id=eq.${projectId}`
        },
        (payload) => {
          console.log('File change detected:', payload);
          fetchFiles();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(filesChannel);
    };
  }, [projectId]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    try {
      setUploading(true);
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // 1. Upload file to Storage
        const filePath = `${projectId}/${Date.now()}_${file.name}`;
        const { error: uploadError, data } = await supabase.storage
          .from('project_files')
          .upload(filePath, file);
          
        if (uploadError) throw uploadError;
        
        // 2. Insert record in project_files table
        const { error: insertError } = await supabase
          .from('project_files')
          .insert({
            project_id: projectId,
            user_id: user!.id,
            file_name: file.name,
            file_path: filePath,
            file_size: file.size,
            file_type: file.type
          });
          
        if (insertError) throw insertError;
      }
      
      toast({
        title: 'Fichier(s) téléversé(s)',
        description: 'Le(s) fichier(s) ont été téléversés avec succès',
      });
      
      fetchFiles();
    } catch (err) {
      console.error('Error uploading file:', err);
      toast({
        title: 'Erreur',
        description: 'Impossible de téléverser le fichier',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      // Reset the file input
      event.target.value = '';
    }
  };

  const handleDownloadFile = async (file: any) => {
    try {
      const { data, error } = await supabase.storage
        .from('project_files')
        .download(file.file_path);
        
      if (error) throw error;
      
      // Create a download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.file_name;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error downloading file:', err);
      toast({
        title: 'Erreur',
        description: 'Impossible de télécharger le fichier',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteFile = async () => {
    if (!fileToDelete) return;
    
    try {
      // 1. Delete from storage
      const { error: storageError } = await supabase.storage
        .from('project_files')
        .remove([fileToDelete.file_path]);
        
      if (storageError) throw storageError;
      
      // 2. Delete record from database
      const { error: dbError } = await supabase
        .from('project_files')
        .delete()
        .eq('id', fileToDelete.id);
        
      if (dbError) throw dbError;
      
      toast({
        title: 'Fichier supprimé',
        description: 'Le fichier a été supprimé avec succès',
      });
      
      // Update local state
      setFiles(files.filter(f => f.id !== fileToDelete.id));
      setFileToDelete(null);
    } catch (err) {
      console.error('Error deleting file:', err);
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer le fichier',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Fichiers du projet</h2>
          <Skeleton className="h-10 w-32" />
        </div>
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Fichiers du projet</h2>
        <div>
          <Input
            type="file"
            id="fileUpload"
            className="hidden"
            multiple
            onChange={handleFileUpload}
            disabled={uploading}
          />
          <Label htmlFor="fileUpload" className="cursor-pointer">
            <Button disabled={uploading} asChild>
              <div>
                <UploadCloud className="h-4 w-4 mr-2" />
                {uploading ? 'Téléversement...' : 'Téléverser des fichiers'}
              </div>
            </Button>
          </Label>
        </div>
      </div>

      {files.length === 0 ? (
        <div className="text-center py-10 border rounded-lg">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground mb-4">Aucun fichier téléversé pour ce projet</p>
          <Label htmlFor="fileUpload" className="cursor-pointer">
            <Button variant="outline" asChild>
              <div>
                <UploadCloud className="h-4 w-4 mr-2" />
                Téléverser votre premier fichier
              </div>
            </Button>
          </Label>
        </div>
      ) : (
        <div className="space-y-3">
          {files.map((file) => (
            <Card key={file.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.file_type)}
                    <div>
                      <p className="font-medium">{file.file_name}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{formatBytes(file.file_size || 0)}</span>
                        <span>Ajouté le {formatDate(file.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDownloadFile(file)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setFileToDelete(file)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={!!fileToDelete} onOpenChange={(open) => !open && setFileToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce fichier ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le fichier sera définitivement supprimé du projet.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteFile} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
