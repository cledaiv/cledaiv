
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Send, Bot } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
};

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      content: 'Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider aujourd\'hui ?',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Préparer le contexte utilisateur si connecté
      let context = '';
      if (user) {
        context = `L'utilisateur est connecté`;
      }
      
      const { data, error } = await supabase.functions.invoke('chatbot', {
        body: { message: input, context },
      });
      
      if (error) throw error;
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.answer,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast({
        title: "Erreur",
        description: "Impossible de communiquer avec l'assistant IA. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container max-w-4xl py-8">
      <Card className="h-[80vh] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6" />
            Assistant IA
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-grow overflow-y-auto pb-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <p className="mt-1 text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        
        <CardFooter className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tapez votre message..."
              disabled={isLoading}
              className="flex-1"
              autoComplete="off"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatBot;
