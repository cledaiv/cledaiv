
export interface Freelancer {
  id: string;
  full_name: string;
  skills?: string[];
  hourly_rate?: number;
  avatar?: string;
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  budget: number;
  currency: string;
  freelancer_id?: string;
  client_id?: string;
  start_date?: Date;
  deadline?: Date;
}
