
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const ChatBot = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      toast({
        title: 'Authentification requise',
        description: 'Veuillez vous connecter pour accéder au chatbot.',
        variant: 'destructive',
      });
      navigate('/auth');
    }
  }, [user, navigate, toast]);

  // Add initial welcome message
  useEffect(() => {
    setChatHistory([
      {
        role: 'assistant',
        content: 'Bonjour ! Je suis votre assistant FreelanceAI. Comment puis-je vous aider aujourd\'hui ?',
      },
    ]);
  }, []);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = { role: 'user' as const, content: message };
    setChatHistory((prev) => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      // Get user context info if available
      const userContext = user ? `L'utilisateur est connecté avec l'email: ${user.email}` : '';
      
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('chatbot', {
        body: { message, context: userContext },
      });

      if (error) throw error;

      // Add AI response to chat
      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', content: data.answer },
      ]);
    } catch (error: any) {
      console.error('Chatbot error:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de communiquer avec l\'assistant. Veuillez réessayer.',
        variant: 'destructive',
      });
      
      // Add error message to chat
      setChatHistory((prev) => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'Désolé, j\'ai rencontré une erreur de communication. Veuillez réessayer.' 
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Assistant IA</h1>
      <p className="text-muted-foreground mb-6">
        Posez vos questions sur notre plateforme, les services freelances, ou pour obtenir de l'aide.
      </p>

      <Card className="mb-4 border-border/40">
        <CardContent className="p-0">
          {/* Chat messages container */}
          <div 
            ref={chatContainerRef}
            className="h-[500px] overflow-y-auto p-4 space-y-4"
          >
            {chatHistory.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`flex items-start gap-2 max-w-[80%] ${
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <Avatar className={`h-8 w-8 ${msg.role === 'user' ? 'bg-primary' : 'bg-secondary'}`}>
                    <AvatarFallback>
                      {msg.role === 'user' ? 'U' : 'AI'}
                    </AvatarFallback>
                    {user?.user_metadata?.avatar_url && msg.role === 'user' && (
                      <AvatarImage src={user.user_metadata.avatar_url} />
                    )}
                  </Avatar>
                  <div 
                    className={`rounded-lg px-4 py-2 ${
                      msg.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2 max-w-[80%]">
                  <Avatar className="h-8 w-8 bg-secondary">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg px-4 py-2 bg-muted flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span>En train de réfléchir...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Message input */}
          <form onSubmit={handleSubmit} className="border-t p-4 flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Posez votre question..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={isLoading || !message.trim()}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="text-sm text-muted-foreground">
        <p>Exemples de questions que vous pouvez poser :</p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Comment trouver un freelance spécialisé en blockchain ?</li>
          <li>Quels services proposez-vous pour les développeurs ?</li>
          <li>Comment fonctionne le système de paiement sur la plateforme ?</li>
          <li>Quelles sont les étapes pour créer un projet ?</li>
        </ul>
      </div>
    </div>
  );
};

export default ChatBot;
