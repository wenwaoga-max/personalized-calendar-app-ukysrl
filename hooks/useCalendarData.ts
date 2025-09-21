
import { useState, useEffect } from 'react';
import { DailyProgram, Task, DailyResolution, Objective, DailyResult } from '../types/calendar';

// Mock data for demonstration
const mockDailyProgram: DailyProgram[] = [
  {
    id: '1',
    time: '07:00',
    title: 'Morning Exercise',
    description: '30 minutes of cardio',
    completed: false,
  },
  {
    id: '2',
    time: '09:00',
    title: 'Team Meeting',
    description: 'Weekly sync with development team',
    completed: false,
  },
  {
    id: '3',
    time: '14:00',
    title: 'Project Review',
    description: 'Review quarterly project progress',
    completed: false,
  },
  {
    id: '4',
    time: '18:00',
    title: 'Personal Reading',
    description: 'Read for 1 hour',
    completed: false,
  },
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Finish the Q1 project proposal document',
    priority: 'high',
    completed: false,
    dueDate: '2024-01-15',
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    title: 'Call dentist for appointment',
    priority: 'medium',
    completed: false,
    createdAt: '2024-01-12',
  },
  {
    id: '3',
    title: 'Buy groceries',
    description: 'Weekly grocery shopping',
    priority: 'low',
    completed: true,
    createdAt: '2024-01-13',
  },
];

const mockObjectives: Objective[] = [
  {
    id: '1',
    title: 'Learn React Native',
    description: 'Complete advanced React Native course',
    targetDate: '2024-03-01',
    progress: 65,
    category: 'learning',
    completed: false,
  },
  {
    id: '2',
    title: 'Lose 10 pounds',
    description: 'Reach target weight through exercise and diet',
    targetDate: '2024-02-15',
    progress: 40,
    category: 'health',
    completed: false,
  },
  {
    id: '3',
    title: 'Save $5000',
    description: 'Emergency fund savings goal',
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
    toggleTask,
    addTask,
    updateResolution,
    updateObjectiveProgress,
    updateDailyResult,
    getStats,
  };
}
