import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Freelancer } from '@/types';

interface ProjectFormProps {
  projectToEdit?: any;
  onSubmit: (projectData: any) => void;
  freelancers: Freelancer[];
  user: any;
}

const ProjectForm = ({ projectToEdit, onSubmit, freelancers, user }: ProjectFormProps) => {
  const [title, setTitle] = useState(projectToEdit?.title || '');
  const [description, setDescription] = useState(projectToEdit?.description || '');
  const [status, setStatus] = useState(projectToEdit?.status || 'open');
  const [budget, setBudget] = useState(projectToEdit?.budget || '');
  const [currency, setCurrency] = useState(projectToEdit?.currency || 'EUR');
  const [selectedFreelancer, setSelectedFreelancer] = useState<Freelancer | null>(projectToEdit?.freelancer || null);
  const [startDate, setStartDate] = useState<Date | undefined>(projectToEdit?.start_date ? new Date(projectToEdit.start_date) : undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(projectToEdit?.deadline ? new Date(projectToEdit.deadline) : undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create the project data
    const projectData = {
      title,
      description,
      status,
      budget: Number(budget),
      currency,
      freelancer_id: selectedFreelancer?.id,
      client_id: user?.id, // Add the missing client_id
      start_date: startDate,
      deadline: endDate
    };
    
    // Call the onSubmit callback with the project data
    onSubmit(projectData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Titre du projet</Label>
        <Input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description du projet</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="status">Statut</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Ouvert</SelectItem>
            <SelectItem value="in_progress">En cours</SelectItem>
            <SelectItem value="completed">Terminé</SelectItem>
            <SelectItem value="cancelled">Annulé</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="budget">Budget</Label>
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
            className="w-32"
          />
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger>
              <SelectValue placeholder="Devise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="freelancer">Freelancer</Label>
        <Select
          value={selectedFreelancer?.id || ''}
          onValueChange={(value) => {
            const freelancer = freelancers.find((f) => f.id === value);
            setSelectedFreelancer(freelancer || null);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un freelancer" />
          </SelectTrigger>
          <SelectContent>
            {freelancers.map((freelancer) => (
              <SelectItem key={freelancer.id} value={freelancer.id}>
                {freelancer.full_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Date de début</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={
                  "w-full justify-start text-left font-normal" +
                  (startDate ? " text-foreground" : " text-muted-foreground")
                }
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Choisir une date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center" side="bottom">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                disabled={(date) =>
                  date > new Date()
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label>Date de fin</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={
                  "w-full justify-start text-left font-normal" +
                  (endDate ? " text-foreground" : " text-muted-foreground")
                }
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Choisir une date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center" side="bottom">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                disabled={(date) =>
                  date < startDate || date < new Date()
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Button type="submit">
        {projectToEdit ? 'Mettre à jour le projet' : 'Créer le projet'}
      </Button>
    </form>
  );
};

export default ProjectForm;
