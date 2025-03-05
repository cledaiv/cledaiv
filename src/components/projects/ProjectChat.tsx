
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SendHorizonal, AlertCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProjectInfo {
  client_id: string;
  freelancer_id: string | null;
}

interface Message {
  id: string;
  content: string;
  sender_id: string;
  recipient_id: string;
  created_at: string;
  is_read: boolean;
}

const formatMessageDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};

export const ProjectChat = ({ projectId }: { projectId: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchProjectInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('client_id, freelancer_id')
        .eq('id', projectId)
        .single();
        
      if (error) throw error;
      setProjectInfo(data);
    } catch (err) {
      console.error('Error fetching project info:', err);
    }
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('project_messages')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les messages',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectInfo();
    fetchMessages();
  }, [projectId]);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollToBottom();
  }, [messages]);

  // Configuration d'un canal en temps réel pour les messages
  useEffect(() => {
    const messagesChannel = supabase
      .channel(`project-${projectId}-messages`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'project_messages',
          filter: `project_id=eq.${projectId}`
        },
        (payload) => {
          console.log('Message change detected:', payload);
          if (payload.eventType === 'INSERT') {
            // Add new message to the list
            setMessages(prev => [...prev, payload.new as Message]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(messagesChannel);
    };
  }, [projectId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user || !projectInfo) return;
    
    try {
      setSending(true);
      
      // Determine recipient (if user is client, send to freelancer and vice versa)
      const isClient = user.id === projectInfo.client_id;
      const recipientId = isClient 
        ? projectInfo.freelancer_id 
        : projectInfo.client_id;
        
      if (!recipientId) {
        toast({
          title: 'Envoi impossible',
          description: 'Aucun destinataire disponible pour ce projet',
          variant: 'destructive',
        });
        return;
      }
      
      const { error } = await supabase
        .from('project_messages')
        .insert({
          project_id: projectId,
          sender_id: user.id,
          recipient_id: recipientId,
          content: newMessage,
          is_read: false
        });
        
      if (error) throw error;
      
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'envoyer le message',
        variant: 'destructive',
      });
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col h-[400px] border rounded-lg p-4">
          <div className="flex-1 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                <Skeleton className={`h-12 w-2/3 rounded-lg`} />
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!projectInfo?.freelancer_id) {
    return (
      <div className="text-center py-10 border rounded-lg">
        <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
        <h3 className="text-lg font-medium mb-2">Aucun freelance assigné</h3>
        <p className="text-muted-foreground">
          La messagerie sera disponible une fois qu'un freelance sera assigné à ce projet.
        </p>
      </div>
    );
  }

  const getInitials = (userId: string) => {
    // Simplification: utiliser les 2 premiers caractères de l'ID utilisateur
    // Dans une application réelle, on récupérerait les initiales depuis le profil utilisateur
    return userId.substring(0, 2).toUpperCase();
  };

  const isOwnMessage = (senderId: string) => user?.id === senderId;

  return (
    <div className="flex flex-col h-[500px] border rounded-lg">
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <MessageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                Aucun message pour le moment. Commencez la conversation!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${isOwnMessage(message.sender_id) ? 'justify-end' : 'justify-start'}`}
              >
                <div className="flex items-end gap-2">
                  {!isOwnMessage(message.sender_id) && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{getInitials(message.sender_id)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div 
                    className={`py-2 px-3 rounded-lg max-w-xs ${
                      isOwnMessage(message.sender_id)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      isOwnMessage(message.sender_id) 
                        ? 'text-primary-foreground/70' 
                        : 'text-muted-foreground'
                    }`}>
                      {formatMessageDate(message.created_at)}
                    </p>
                  </div>
                  {isOwnMessage(message.sender_id) && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{getInitials(message.sender_id)}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Tapez votre message..."
            className="min-h-[60px] resize-none"
            disabled={sending}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!newMessage.trim() || sending}
            className="self-end"
          >
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Icône de message stylisée pour l'état vide
const MessageIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
