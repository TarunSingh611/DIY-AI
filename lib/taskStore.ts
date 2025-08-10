import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Task {
  id: string;
  title: string;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  importance: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  estimatedTime: number; // in minutes
  deadline?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority?: number; // AI-calculated priority score
  prioritizedAt?: string; // When the task was last prioritized
  createdAt: string;
  updatedAt: string;
}

interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  
  // Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setTaskStatus: (id: string, status: Task['status']) => void;
        setPriority: (id: string, priority: number) => void;
      setPrioritizedAt: (id: string, timestamp: string) => void;
  clearCompleted: () => void;
  clearAll: () => void;
  importTasks: (tasks: Task[]) => void;
  
  // AI Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  prioritizeTasks: () => Promise<void>;
  
  // Getters
  getPendingTasks: () => Task[];
  getCompletedTasks: () => Task[];
  getTasksByCategory: (category: string) => Task[];
  getTasksByPriority: () => Task[];
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      loading: false,
      error: null,

      addTask: (taskData) => {
        // Generate a unique ID using timestamp + random string + counter
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 15);
        const counter = Math.floor(Math.random() * 10000);
        const uniqueId = `${timestamp}-${random}-${counter}`;
        
        const newTask: Task = {
          ...taskData,
          id: uniqueId,
          status: 'pending',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        // Ensure no duplicate IDs exist
        set((state) => {
          const existingIds = new Set(state.tasks.map(task => task.id));
          let finalId = uniqueId;
          let counter = 1;
          
          // If by some extremely rare chance we have a duplicate, add a counter
          while (existingIds.has(finalId)) {
            finalId = `${uniqueId}-${counter}`;
            counter++;
          }
          
          return {
            tasks: [...state.tasks, { ...newTask, id: finalId }],
          };
        });
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...updates, updatedAt: new Date().toISOString() }
              : task
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      setTaskStatus: (id, status) => {
        get().updateTask(id, { status });
      },

      setPriority: (id, priority) => {
        get().updateTask(id, { priority });
      },

      setPrioritizedAt: (id, timestamp) => {
        get().updateTask(id, { prioritizedAt: timestamp });
      },

      clearCompleted: () => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.status !== 'completed'),
        }));
      },

      clearAll: () => {
        set({ tasks: [] });
      },

      importTasks: (tasksToImport) => {
        set({ tasks: tasksToImport });
      },

      setLoading: (loading) => {
        set({ loading });
      },

      setError: (error) => {
        set({ error });
      },

      prioritizeTasks: async () => {
        const { tasks, setLoading, setError, setPriority, setPrioritizedAt } = get();
        const pendingTasks = tasks.filter((task) => task.status === 'pending');
        
        if (pendingTasks.length === 0) {
          setError('No pending tasks to prioritize');
          return;
        }

        setLoading(true);
        setError(null);

        try {
          const response = await fetch('/api/prioritize-tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tasks: pendingTasks }),
          });

          if (!response.ok) {
            throw new Error('Failed to prioritize tasks');
          }

          const { priorities } = await response.json();
          
          // Update tasks with new priorities
          const timestamp = new Date().toISOString();
          priorities.forEach(({ id, priority }: { id: string; priority: number }) => {
            setPriority(id, priority);
            setPrioritizedAt(id, timestamp);
          });
        } catch (error) {
          setError(error instanceof Error ? error.message : 'Failed to prioritize tasks');
        } finally {
          setLoading(false);
        }
      },

      getPendingTasks: () => {
        return get().tasks.filter((task) => task.status === 'pending');
      },

      getCompletedTasks: () => {
        return get().tasks.filter((task) => task.status === 'completed');
      },

      getTasksByCategory: (category) => {
        return get().tasks.filter((task) => task.category === category);
      },

      getTasksByPriority: () => {
        const tasks = get().getPendingTasks();
        return tasks.sort((a, b) => {
          // Sort by priority score (highest first), then by urgency, then by importance
          if (a.priority && b.priority) {
            return b.priority - a.priority;
          }
          
          const urgencyOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          const importanceOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          
          const urgencyDiff = urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
          if (urgencyDiff !== 0) return urgencyDiff;
          
          return importanceOrder[b.importance] - importanceOrder[a.importance];
        });
      },
    }),
    {
      name: 'task-store',
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);
