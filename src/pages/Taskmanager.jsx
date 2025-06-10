import React, { useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import Card from '../components/Card';
import Button from '../components/Button';
import { Check, Edit, Save, X, Plus, Trash2, ClipboardList, Lightbulb } from 'lucide-react';

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [newTaskError, setNewTaskError] = useState(false);

  const addTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setNewTaskError(false);
    } else {
      setNewTaskError(true);
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = () => {
    if (editingText.trim()) {
      setTasks(tasks.map(task =>
        task.id === editingId ? { ...task, text: editingText.trim() } : task
      ));
    }
    setEditingId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'active':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    active: tasks.filter(task => !task.completed).length
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Task Manager
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Organize your tasks and boost your productivity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {stats.total}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Tasks</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {stats.completed}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Completed</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {stats.active}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Active</div>
          </Card>
        </div>

        {/* Add Task Form */}
        <Card className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => {
                setNewTask(e.target.value);
                setNewTaskError(false); // Clear error on change
              }}
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                newTaskError
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            />
            <Button onClick={addTask}>
              <Plus className="w-5 h-5 mr-2" />
              Add Task
            </Button>
          </div>
          {newTaskError && (
            <p className="text-red-500 text-sm mt-2">Task cannot be empty!</p>
          )}
        </Card>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {['all', 'active', 'completed'].map((filterType) => (
            <Button
              key={filterType}
              variant={filter === filterType ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterType)}
              className="capitalize"
            >
              {filterType} ({
                filterType === 'all' ? stats.total :
                filterType === 'active' ? stats.active : stats.completed
              })
            </Button>
          ))}
          {stats.completed > 0 && (
            <Button
              variant="danger"
              size="sm"
              onClick={clearCompleted}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Clear Completed
            </Button>
          )}
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Card className="text-center py-12">
              <div className="mb-4">
                {filter === 'all' && (
                  <ClipboardList className="w-24 h-24 mx-auto text-blue-400 mb-4" />
                )}
                {filter === 'active' && (
                  <Lightbulb className="w-24 h-24 mx-auto text-orange-400 mb-4" />
                )}
                {filter === 'completed' && (
                  <Check className="w-24 h-24 mx-auto text-green-400 mb-4" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {tasks.length === 0
                  ? 'No tasks yet!'
                  : `No ${filter} tasks.`}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {tasks.length === 0
                  ? 'Start by adding a new task above.'
                  : `Looks like you have no ${filter} tasks at the moment.`}
              </p>
              {tasks.length > 0 && filter !== 'all' && (
                <Button
                  onClick={() => setFilter('all')}
                  className="mt-4"
                >
                  Show All Tasks
                </Button>
              )}
            </Card>
          ) : (
            filteredTasks.map((task) => (
              <Card key={task.id} className="transition-all duration-200 hover:shadow-md">
                <div className="flex items-center gap-4">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      task.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 dark:border-gray-600 hover:border-green-400'
                    }`}
                  >
                    {task.completed && <Check className="w-4 h-4" />}
                  </button>

                  {/* Task Text / Edit Input */}
                  {editingId === task.id ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyPress={handleEditKeyPress}
                      onBlur={saveEdit} // Save on blur
                      className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      autoFocus
                    />
                  ) : (
                    <span
                      className={`flex-1 text-lg ${task.completed ? 'line-through text-gray-500 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}
                      onDoubleClick={() => startEditing(task.id, task.text)} // Double click to edit
                    >
                      {task.text}
                    </span>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {editingId === task.id ? (
                      <>
                        <Button variant="ghost" size="icon" onClick={saveEdit}>
                          <Save className="w-5 h-5 text-green-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={cancelEdit}>
                          <X className="w-5 h-5 text-gray-500" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="ghost" size="icon" onClick={() => startEditing(task.id, task.text)}>
                          <Edit className="w-5 h-5 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)}>
                          <Trash2 className="w-5 h-5 text-red-500" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;