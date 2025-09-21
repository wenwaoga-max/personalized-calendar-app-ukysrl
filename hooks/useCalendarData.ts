
import { useState, useEffect } from 'react';
import { DailyProgram, Task, DailyResolution, Objective, DailyResult } from '../types/calendar';

// Mock data for demonstration
const mockDailyProgram: DailyProgram[] = [
  {
    id: '1',
    date: '2024-01-15',
    time: '07:00',
    title: 'Exercice Matinal',
    description: '30 minutes de cardio',
    note: 'Ne pas oublier les étirements',
    completed: false,
    createdAt: '2024-01-14T20:00:00Z',
  },
  {
    id: '2',
    date: '2024-01-15',
    time: '09:00',
    title: 'Réunion Équipe',
    description: 'Synchronisation hebdomadaire avec l\'équipe de développement',
    completed: false,
    createdAt: '2024-01-14T20:00:00Z',
  },
  {
    id: '3',
    date: '2024-01-15',
    time: '14:00',
    title: 'Révision Projet',
    description: 'Réviser les progrès du projet trimestriel',
    note: 'Préparer les métriques de performance',
    completed: false,
    createdAt: '2024-01-14T20:00:00Z',
  },
  {
    id: '4',
    date: '2024-01-15',
    time: '18:00',
    title: 'Lecture Personnelle',
    description: 'Lire pendant 1 heure',
    completed: false,
    createdAt: '2024-01-14T20:00:00Z',
  },
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Terminer la proposition de projet',
    description: 'Finaliser le document de proposition de projet Q1',
    priority: 'high',
    completed: false,
    dueDate: '2024-01-15',
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    title: 'Appeler le dentiste pour un rendez-vous',
    priority: 'medium',
    completed: false,
    createdAt: '2024-01-12',
  },
  {
    id: '3',
    title: 'Acheter les courses',
    description: 'Courses hebdomadaires',
    priority: 'low',
    completed: true,
    createdAt: '2024-01-13',
  },
];

const mockObjectives: Objective[] = [
  {
    id: '1',
    title: 'Apprendre React Native',
    description: 'Terminer le cours avancé React Native',
    targetDate: '2024-03-01',
    progress: 65,
    category: 'learning',
    completed: false,
  },
  {
    id: '2',
    title: 'Perdre 5 kilos',
    description: 'Atteindre le poids cible grâce à l\'exercice et au régime',
    targetDate: '2024-02-15',
    progress: 40,
    category: 'health',
    completed: false,
  },
  {
    id: '3',
    title: 'Économiser 5000€',
    description: 'Objectif d\'épargne d\'urgence',
    targetDate: '2024-06-01',
    progress: 80,
    category: 'personal',
    completed: false,
  },
];

export function useCalendarData() {
  const [dailyProgram, setDailyProgram] = useState<DailyProgram[]>(mockDailyProgram);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [dailyResolution, setDailyResolution] = useState<DailyResolution | null>(null);
  const [objectives, setObjectives] = useState<Objective[]>(mockObjectives);
  const [dailyResult, setDailyResult] = useState<DailyResult | null>(null);

  const toggleProgramItem = (id: string) => {
    setDailyProgram(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addProgramItem = (program: {
    date: string;
    time: string;
    title: string;
    description?: string;
    note?: string;
  }) => {
    const newProgram: DailyProgram = {
      ...program,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setDailyProgram(prev => [...prev, newProgram].sort((a, b) => {
      // Sort by date first, then by time
      if (a.date !== b.date) {
        return a.date.localeCompare(b.date);
      }
      return a.time.localeCompare(b.time);
    }));
  };

  const updateProgramItem = (id: string, updates: {
    date?: string;
    time?: string;
    title?: string;
    description?: string;
    note?: string;
  }) => {
    setDailyProgram(prev => 
      prev.map(item => 
        item.id === id ? { ...item, ...updates } : item
      ).sort((a, b) => {
        // Sort by date first, then by time
        if (a.date !== b.date) {
          return a.date.localeCompare(b.date);
        }
        return a.time.localeCompare(b.time);
      })
    );
  };

  const deleteProgramItem = (id: string) => {
    setDailyProgram(prev => prev.filter(item => item.id !== id));
  };

  const getProgramsForDate = (date: string) => {
    return dailyProgram.filter(item => item.date === date);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateResolution = (resolution: Omit<DailyResolution, 'id'>) => {
    const newResolution: DailyResolution = {
      ...resolution,
      id: Date.now().toString(),
    };
    setDailyResolution(newResolution);
  };

  const updateObjectiveProgress = (id: string, progress: number) => {
    setObjectives(prev => 
      prev.map(obj => 
        obj.id === id ? { ...obj, progress, completed: progress >= 100 } : obj
      )
    );
  };

  const updateDailyResult = (result: Omit<DailyResult, 'id'>) => {
    const newResult: DailyResult = {
      ...result,
      id: Date.now().toString(),
    };
    setDailyResult(newResult);
  };

  // Calculate daily statistics
  const getStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const completedProgram = dailyProgram.filter(item => item.completed).length;
    const totalProgram = dailyProgram.length;
    const avgObjectiveProgress = objectives.reduce((sum, obj) => sum + obj.progress, 0) / objectives.length;

    return {
      tasksCompleted: completedTasks,
      totalTasks,
      programCompleted: completedProgram,
      totalProgram,
      taskCompletionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
      programCompletionRate: totalProgram > 0 ? (completedProgram / totalProgram) * 100 : 0,
      avgObjectiveProgress: Math.round(avgObjectiveProgress),
    };
  };

  return {
    dailyProgram,
    tasks,
    dailyResolution,
    objectives,
    dailyResult,
    toggleProgramItem,
    addProgramItem,
    updateProgramItem,
    deleteProgramItem,
    getProgramsForDate,
    toggleTask,
    addTask,
    updateResolution,
    updateObjectiveProgress,
    updateDailyResult,
    getStats,
  };
}
