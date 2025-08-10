"use client";
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTaskStore, Task } from '@/lib/taskStore';
import { ArrowLeft, Plus, Trash2, CheckCircle, Clock, Zap, Target, Calendar, Filter, Download, Upload, Menu, X, Smartphone } from 'lucide-react';
import Link from 'next/link';



export default function TaskPrioritizerPage() {
  const {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    setTaskStatus,
    prioritizeTasks,
    clearCompleted,
    clearAll,
    importTasks,
    getPendingTasks,
    getCompletedTasks,
    getTasksByPriority,
    setError
  } = useTaskStore();

  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'urgency' | 'importance' | 'deadline'>('priority');
  const [prioritizedTasks, setPrioritizedTasks] = useState<Set<string>>(new Set());
  const [showPrioritizationSuccess, setShowPrioritizationSuccess] = useState(false);
  const [showImportSuccess, setShowImportSuccess] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    urgency: 'medium' as Task['urgency'],
    importance: 'medium' as Task['importance'],
    category: '',
    estimatedTime: 30,
    deadline: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Task title is required');
      return;
    }

    addTask({
      title: formData.title.trim(),
      description: formData.description.trim(),
      urgency: formData.urgency,
      importance: formData.importance,
      category: formData.category.trim() || 'General',
      estimatedTime: formData.estimatedTime,
      deadline: formData.deadline || undefined
    });

    // Reset form
    setFormData({
      title: '',
      description: '',
      urgency: 'medium',
      importance: 'medium',
      category: '',
      estimatedTime: 30,
      deadline: ''
    });
    setShowAddForm(false);
    setError(null);
  };



  const handlePrioritize = async () => {
    const pendingTasks = getPendingTasks();
    if (pendingTasks.length === 0) {
      setError('No pending tasks to prioritize');
      return;
    }

    setError(null);
    setShowPrioritizationSuccess(false);
    
    try {
      await prioritizeTasks();
      
      // Mark all pending tasks as recently prioritized
      const taskIds = pendingTasks.map(task => task.id);
      setPrioritizedTasks(new Set(taskIds));
      setShowPrioritizationSuccess(true);
      
      // Auto-sort by priority after prioritization
      setSortBy('priority');
      
      // Clear the prioritization highlight after 5 seconds
      setTimeout(() => {
        setPrioritizedTasks(new Set());
        setShowPrioritizationSuccess(false);
      }, 5000);
    } catch (error) {
      setError('Failed to prioritize tasks. Please try again.');
    }
  };

  const getFilteredTasks = () => {
    let filtered = tasks;
    
    switch (filter) {
      case 'pending':
        filtered = getPendingTasks();
        break;
      case 'completed':
        filtered = getCompletedTasks();
        break;
      default:
        filtered = tasks;
    }

    // Sort tasks
    switch (sortBy) {
      case 'priority':
        return filtered.sort((a, b) => {
          if (a.priority && b.priority) return b.priority - a.priority;
          return 0;
        });
      case 'urgency':
        const urgencyOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return filtered.sort((a, b) => urgencyOrder[b.urgency] - urgencyOrder[a.urgency]);
      case 'importance':
        const importanceOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return filtered.sort((a, b) => importanceOrder[b.importance] - importanceOrder[a.importance]);
      case 'deadline':
        return filtered.sort((a, b) => {
          if (!a.deadline && !b.deadline) return 0;
          if (!a.deadline) return 1;
          if (!b.deadline) return -1;
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        });
      default:
        return filtered;
    }
  };

  const getPriorityColor = (priority?: number) => {
    if (!priority) return 'bg-gray-200 text-gray-600';
    if (priority >= 80) return 'bg-red-500 text-white';
    if (priority >= 60) return 'bg-orange-500 text-white';
    if (priority >= 40) return 'bg-yellow-500 text-white';
    if (priority >= 20) return 'bg-green-500 text-white';
    return 'bg-gray-400 text-white';
  };

  const getPriorityLabel = (priority?: number) => {
    if (!priority) return 'No Priority';
    if (priority >= 80) return 'Critical';
    if (priority >= 60) return 'High';
    if (priority >= 40) return 'Medium';
    if (priority >= 20) return 'Low';
    return 'Very Low';
  };

  const getUrgencyColor = (urgency: Task['urgency']) => {
    switch (urgency) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
    }
  };

  const getImportanceColor = (importance: Task['importance']) => {
    switch (importance) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
    }
  };

  const exportTasks = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `tasks-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportTasks = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedTasks = JSON.parse(e.target?.result as string);
        
        if (!Array.isArray(importedTasks)) {
          setError('Invalid file format: Expected an array of tasks');
          return;
        }

        // Validate and prepare tasks for import
        const validTasks: Task[] = [];
        
        importedTasks.forEach((task: any) => {
          // Validate required fields
          if (!task.title || !task.urgency || !task.importance || !task.category || !task.estimatedTime) {
            console.warn('Skipping task with missing required fields:', task);
            return;
          }

          // Create task with original data, preserving IDs and timestamps if they exist
          const importedTask: Task = {
            id: task.id || `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`,
            title: task.title,
            description: task.description || '',
            urgency: task.urgency,
            importance: task.importance,
            category: task.category,
            estimatedTime: task.estimatedTime,
            deadline: task.deadline,
            status: task.status || 'pending',
            priority: task.priority,
            prioritizedAt: task.prioritizedAt,
            createdAt: task.createdAt || new Date().toISOString(),
            updatedAt: task.updatedAt || new Date().toISOString(),
          };

          validTasks.push(importedTask);
        });

        // Import all valid tasks at once
        importTasks(validTasks);

        setError(null);
        setShowImportSuccess(true);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowImportSuccess(false);
        }, 3000);
      } catch (error) {
        console.error('Import error:', error);
        setError('Invalid file format or corrupted data');
      }
    };
    reader.readAsText(file);
  };

  const filteredTasks = getFilteredTasks();

  // Show loading state until hydrated
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 text-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 text-gray-900">
      <Header />

      <main>
        {/* Back Button */}
        <section className="pt-8 pb-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-4 inline-block"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to App Selection
            </Link>
          </div>
        </section>

        {/* Hero Section */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                AI Task Prioritizer
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-6">
                Beat decision fatigue with AI-powered task prioritization. Get intelligent recommendations 
                based on urgency, importance, deadlines, and time estimates.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">How AI Prioritization Works:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Analyzes urgency, importance, deadlines, and time estimates</li>
                  <li>• Considers task categories and context</li>
                  <li>• Assigns priority scores from 1-100 (100 = highest priority)</li>
                  <li>• Automatically sorts tasks by priority after analysis</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              
                             {/* Stats and Actions */}
               <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                 {/* Mobile Stats - Grid Layout */}
                 <div className="md:hidden mb-6">
                   <div className="grid grid-cols-4 gap-2">
                     <div className="text-center">
                       <div className="text-lg font-bold text-blue-600">{tasks.length}</div>
                       <div className="text-xs text-gray-600">Total</div>
                     </div>
                     <div className="text-center">
                       <div className="text-lg font-bold text-orange-600">{getPendingTasks().length}</div>
                       <div className="text-xs text-gray-600">Pending</div>
                     </div>
                     <div className="text-center">
                       <div className="text-lg font-bold text-green-600">{getCompletedTasks().length}</div>
                       <div className="text-xs text-gray-600">Done</div>
                     </div>
                     <div className="text-center">
                       <div className="text-lg font-bold text-purple-600">
                         {tasks.filter(t => t.priority && t.priority >= 80).length}
                       </div>
                       <div className="text-xs text-gray-600">High Priority</div>
                     </div>
                   </div>
                 </div>

                 {/* Desktop Stats */}
                 <div className="hidden md:grid md:grid-cols-4 gap-6 mb-6">
                   <div className="text-center">
                     <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
                     <div className="text-sm text-gray-600">Total Tasks</div>
                   </div>
                   <div className="text-center">
                     <div className="text-2xl font-bold text-orange-600">{getPendingTasks().length}</div>
                     <div className="text-sm text-gray-600">Pending</div>
                   </div>
                   <div className="text-center">
                     <div className="text-2xl font-bold text-green-600">{getCompletedTasks().length}</div>
                     <div className="text-sm text-gray-600">Completed</div>
                   </div>
                   <div className="text-center">
                     <div className="text-2xl font-bold text-purple-600">
                       {tasks.filter(t => t.priority && t.priority >= 80).length}
                     </div>
                     <div className="text-sm text-gray-600">High Priority</div>
                   </div>
                 </div>

                 {/* Desktop Actions */}
                 <div className="hidden md:flex flex-wrap gap-4 justify-center">
                   <button
                     onClick={() => setShowAddForm(true)}
                     className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                   >
                     <Plus className="w-5 h-5" />
                     Add Task
                   </button>

                   <button
                     onClick={handlePrioritize}
                     disabled={loading || getPendingTasks().length === 0}
                     className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     <Zap className="w-5 h-5" />
                     {loading ? 'Prioritizing...' : 'AI Prioritize'}
                   </button>

                   <button
                     onClick={clearCompleted}
                     disabled={getCompletedTasks().length === 0}
                     className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     <Trash2 className="w-5 h-5" />
                     Clear Completed
                   </button>

                   <div className="flex gap-2">
                     <button
                       onClick={exportTasks}
                       className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                     >
                       <Download className="w-4 h-4" />
                       Export
                     </button>
                     <label className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
                       <Upload className="w-4 h-4" />
                       Import
                       <input
                         type="file"
                         accept=".json"
                         onChange={handleImportTasks}
                         className="hidden"
                       />
                     </label>
                   </div>
                 </div>

                 {/* Mobile Actions */}
                 <div className="md:hidden">
                   <div className="flex flex-wrap gap-2 justify-center mb-4">
                     <button
                       onClick={() => setShowAddForm(true)}
                       className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm"
                     >
                       <Plus className="w-4 h-4" />
                       Add
                     </button>
                     <button
                       onClick={handlePrioritize}
                       disabled={loading || getPendingTasks().length === 0}
                       className="flex items-center gap-1 px-3 py-2 bg-purple-600 text-white rounded-lg text-sm disabled:opacity-50"
                     >
                       <Zap className="w-4 h-4" />
                       Prioritize
                     </button>
                     <button
                       onClick={clearCompleted}
                       disabled={getCompletedTasks().length === 0}
                       className="flex items-center gap-1 px-3 py-2 bg-gray-600 text-white rounded-lg text-sm disabled:opacity-50"
                     >
                       <Trash2 className="w-4 h-4" />
                       Clear
                     </button>
                     <button
                       onClick={() => setShowMobileMenu(!showMobileMenu)}
                       className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm"
                     >
                       <Menu className="w-4 h-4" />
                       More
                     </button>
                   </div>

                   {/* Mobile Menu for Export/Import */}
                   {showMobileMenu && (
                     <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                       <div className="flex gap-2 justify-center">
                         <button
                           onClick={() => { exportTasks(); setShowMobileMenu(false); }}
                           className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm"
                         >
                           <Download className="w-4 h-4" />
                           Export
                         </button>
                         <label className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm cursor-pointer">
                           <Upload className="w-4 h-4" />
                           Import
                           <input
                             type="file"
                             accept=".json"
                             onChange={handleImportTasks}
                             className="hidden"
                           />
                         </label>
                       </div>
                     </div>
                   )}
                 </div>
               </div>

              {/* Priority Legend */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Priority Guide</h3>
                                 <div className="grid md:grid-cols-5 gap-4">
                   <div className="flex items-center gap-2">
                     <span className="w-4 h-4 bg-red-500 rounded-full"></span>
                     <span className="text-sm text-gray-700">80-100: Critical</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="w-4 h-4 bg-orange-500 rounded-full"></span>
                     <span className="text-sm text-gray-700">60-79: High</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
                     <span className="text-sm text-gray-700">40-59: Medium</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                     <span className="text-sm text-gray-700">20-39: Low</span>
                   </div>
                   <div className="flex items-center gap-2">
                     <span className="w-4 h-4 bg-gray-400 rounded-full"></span>
                     <span className="text-sm text-gray-700">1-19: Very Low</span>
                   </div>
                 </div>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Filter:</span>
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value as any)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Tasks</option>
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="priority">Priority (AI Score)</option>
                      <option value="urgency">Urgency</option>
                      <option value="importance">Importance</option>
                      <option value="deadline">Deadline</option>
                    </select>
                    {sortBy === 'priority' && (
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        Highest first
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              {/* Success Messages */}
              {showPrioritizationSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Tasks prioritized successfully! Tasks are now sorted by AI-calculated priority.</span>
                </div>
              )}

              {showImportSuccess && (
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Tasks imported successfully!</span>
                </div>
              )}

                             {/* Add Task Form */}
               {showAddForm && (
                 <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                   <h3 className="text-xl font-bold text-gray-900 mb-4">Add New Task</h3>
                   <form onSubmit={handleSubmit} className="space-y-4">
                     <div className="grid md:grid-cols-2 gap-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Task Title *
                         </label>
                         <input
                           type="text"
                           value={formData.title}
                           onChange={(e) => setFormData({...formData, title: e.target.value})}
                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           placeholder="Enter task title"
                           required
                         />
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Category
                         </label>
                         <input
                           type="text"
                           value={formData.category}
                           onChange={(e) => setFormData({...formData, category: e.target.value})}
                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           placeholder="Work, Personal, Health, etc."
                         />
                       </div>
                     </div>

                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">
                         Description
                       </label>
                       <textarea
                         value={formData.description}
                         onChange={(e) => setFormData({...formData, description: e.target.value})}
                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                         rows={3}
                         placeholder="Describe the task..."
                       />
                     </div>

                     <div className="grid md:grid-cols-4 gap-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Urgency
                         </label>
                         <select
                           value={formData.urgency}
                           onChange={(e) => setFormData({...formData, urgency: e.target.value as Task['urgency']})}
                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                         >
                           <option value="low">Low</option>
                           <option value="medium">Medium</option>
                           <option value="high">High</option>
                           <option value="critical">Critical</option>
                         </select>
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Importance
                         </label>
                         <select
                           value={formData.importance}
                           onChange={(e) => setFormData({...formData, importance: e.target.value as Task['importance']})}
                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                         >
                           <option value="low">Low</option>
                           <option value="medium">Medium</option>
                           <option value="high">High</option>
                           <option value="critical">Critical</option>
                         </select>
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Est. Time (min)
                         </label>
                         <input
                           type="number"
                           value={formData.estimatedTime}
                           onChange={(e) => setFormData({...formData, estimatedTime: parseInt(e.target.value) || 0})}
                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           min="1"
                         />
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-2">
                           Deadline
                         </label>
                         <input
                           type="datetime-local"
                           value={formData.deadline}
                           onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                         />
                       </div>
                     </div>

                     <div className="flex gap-4">
                       <button
                         type="submit"
                         className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                       >
                         Add Task
                       </button>
                       <button
                         type="button"
                         onClick={() => setShowAddForm(false)}
                         className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                       >
                         Cancel
                       </button>
                     </div>
                   </form>
                 </div>
               )}



              {/* Tasks List */}
              <div className="space-y-4">
                {filteredTasks.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                    <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
                    <p className="text-gray-600 mb-4">Add your first task to get started!</p>
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add Task
                    </button>
                  </div>
                ) : (
                                     filteredTasks.map((task) => (
                     <div
                       key={task.id}
                       className={`bg-white rounded-xl shadow-lg p-4 md:p-6 border-l-4 transition-all duration-300 ${
                         task.status === 'completed' 
                           ? 'border-green-500 opacity-75' 
                           : task.priority && task.priority >= 80
                           ? 'border-red-500'
                           : task.priority && task.priority >= 60
                           ? 'border-orange-500'
                           : 'border-blue-500'
                       } ${
                         prioritizedTasks.has(task.id) 
                           ? 'ring-2 ring-purple-300 shadow-lg scale-[1.02]' 
                           : ''
                       }`}
                     >
                       <div className="flex items-start justify-between">
                         <div className="flex-1 min-w-0">
                           <div className="flex items-start gap-2 mb-2">
                             <h3 className={`text-base md:text-lg font-semibold flex-1 min-w-0 ${
                               task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'
                             }`}>
                               {task.title}
                             </h3>
                             {task.priority && (
                               <div className="flex items-center gap-1 flex-shrink-0">
                                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                   {task.priority}
                                 </span>
                                 <span className="hidden sm:inline text-xs text-gray-500">
                                   ({getPriorityLabel(task.priority)})
                                 </span>
                                 {prioritizedTasks.has(task.id) && (
                                   <span className="text-xs text-purple-600 font-medium animate-pulse">
                                     ✨
                                   </span>
                                 )}
                               </div>
                             )}
                           </div>
                           
                           {task.description && (
                             <p className={`text-gray-700 mb-3 text-sm ${
                               task.status === 'completed' ? 'line-through' : ''
                             }`}>
                               {task.description}
                             </p>
                           )}

                           {/* Mobile: Compact tags */}
                           <div className="md:hidden flex flex-wrap gap-1 mb-3">
                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(task.urgency)}`}>
                               {task.urgency}
                             </span>
                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImportanceColor(task.importance)}`}>
                               {task.importance}
                             </span>
                             <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                               {task.category}
                             </span>
                             <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-600">
                               {task.estimatedTime}m
                             </span>
                             {task.deadline && (
                               <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600">
                                 <Calendar className="w-3 h-3 inline mr-1" />
                                 {new Date(task.deadline).toLocaleDateString()}
                               </span>
                             )}
                           </div>

                           {/* Desktop: Full tags */}
                           <div className="hidden md:flex flex-wrap gap-2 mb-3">
                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(task.urgency)}`}>
                               {task.urgency} urgency
                             </span>
                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImportanceColor(task.importance)}`}>
                               {task.importance} importance
                             </span>
                             <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                               {task.category}
                             </span>
                             <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-600">
                               {task.estimatedTime} min
                             </span>
                             {task.deadline && (
                               <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-600">
                                 <Calendar className="w-3 h-3 inline mr-1" />
                                 {new Date(task.deadline).toLocaleDateString()}
                               </span>
                             )}
                           </div>

                           {/* Mobile: Show prioritization info */}
                           {(task.prioritizedAt && !prioritizedTasks.has(task.id)) && (
                             <div className="md:hidden text-xs text-gray-500 mb-2">
                               Prioritized {new Date(task.prioritizedAt).toLocaleDateString()}
                             </div>
                           )}
                         </div>

                         <div className="flex items-center gap-1 md:gap-2 ml-2 md:ml-4 flex-shrink-0">
                           <button
                             onClick={() => setTaskStatus(task.id, task.status === 'completed' ? 'pending' : 'completed')}
                             className={`p-2 md:p-2 rounded-lg transition-colors ${
                               task.status === 'completed'
                                 ? 'text-green-600 hover:bg-green-100'
                                 : 'text-gray-400 hover:bg-gray-100'
                             }`}
                           >
                             <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                           </button>
                           <button
                             onClick={() => deleteTask(task.id)}
                             className="p-2 md:p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                           >
                             <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                           </button>
                         </div>
                       </div>
                     </div>
                   ))
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

             <Footer />


     </div>
   );
 }
