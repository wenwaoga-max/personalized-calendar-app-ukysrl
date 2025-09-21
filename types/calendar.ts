
export interface DailyProgram {
  id: string;
  time: string;
  title: string;
  description?: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  dueDate?: string;
  createdAt: string;
}

export interface DailyResolution {
  id: string;
  date: string;
  resolution: string;
  reflection?: string;
  mood: 'excellent' | 'good' | 'neutral' | 'poor';
}

export interface Objective {
  id: string;
  title: string;
  description?: string;
  targetDate: string;
  progress: number; // 0-100
  category: 'personal' | 'professional' | 'health' | 'learning';
  completed: boolean;
}

export interface DailyResult {
  id: string;
  date: string;
  tasksCompleted: number;
  totalTasks: number;
  objectivesProgress: number;
  notes?: string;
  rating: number; // 1-5 stars
}
