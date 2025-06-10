import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Plus, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Calendar,
  Tag,
  MoreVertical,
  Star,
  Trash2
} from 'lucide-react';

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: 'Complete React Project', 
      description: 'Finish implementing all features and styling',
      status: 'in-progress',
      priority: 'high',
      category: 'Development',
      dueDate: '2024-03-20'
    },
    { 
      id: 2, 
      title: 'Write Documentation', 
      description: 'Document all components and their usage',
      status: 'todo',
      priority: 'medium',
      category: 'Documentation',
      dueDate: '2024-03-22'
    },
    { 
      id: 3, 
      title: 'Test Application', 
      description: 'Perform comprehensive testing of all features',
      status: 'completed',
      priority: 'high',
      category: 'Testing',
      dueDate: '2024-03-18'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredTask, setHoveredTask] = useState(null);

  const categories = ['all', 'Development', 'Documentation', 'Testing'];
  
  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);

  const priorityColors = {
    high: 'text-red-500 dark:text-red-400',
    medium: 'text-yellow-500 dark:text-yellow-400',
    low: 'text-green-500 dark:text-green-400'
  };

  const handleStatusChange = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const statusMap = {
          'todo': 'in-progress',
          'in-progress': 'completed',
          'completed': 'todo'
        };
        return { ...task, status: statusMap[task.status] };
      }
      return task;
    }));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section */}
          <div className="relative text-center mb-16">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/20 dark:border-blue-700/20 backdrop-blur-sm mb-8">
                <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Task Management
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400">
                Manage Your Tasks
              </h1>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Tasks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Add Task Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full flex items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 cursor-pointer group">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Add New Task</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Click to create a new task
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Task Cards */}
            <AnimatePresence>
              {filteredTasks.map((task) => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  onHoverStart={() => setHoveredTask(task.id)}
                  onHoverEnd={() => setHoveredTask(null)}
                >
                  <Card className="h-full p-6 relative group">
                    {/* Task Status Button */}
                    <button
                      onClick={() => handleStatusChange(task.id)}
                      className="absolute top-4 right-4 transform transition-transform group-hover:scale-110"
                    >
                      {getStatusIcon(task.status)}
                    </button>

                    {/* Task Content */}
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 pr-8">
                        {task.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {task.description}
                      </p>
                    </div>

                    {/* Task Metadata */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Due: {task.dueDate}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Tag className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {task.category}
                        </span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Star className={`w-4 h-4 mr-2 ${priorityColors[task.priority]}`} />
                        <span className={`capitalize ${priorityColors[task.priority]}`}>
                          {task.priority} Priority
                        </span>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <AnimatePresence>
                      {hoveredTask === task.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-4 right-4 flex space-x-2"
                        >
                          <Button variant="ghost" size="sm" className="p-2">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-2 text-red-500 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Tasks; 