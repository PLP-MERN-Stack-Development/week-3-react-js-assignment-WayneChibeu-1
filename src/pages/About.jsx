import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

const About = () => {
  const technologies = [
    {
      name: 'React 18',
      description: 'Latest version of React with concurrent features',
      icon: '⚛️',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework for rapid UI development',
      icon: '🎨',
      color: 'text-cyan-600 dark:text-cyan-400'
    },
    {
      name: 'Vite',
      description: 'Fast build tool and development server',
      icon: '⚡',
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      name: 'React Router',
      description: 'Declarative routing for React applications',
      icon: '🛣️',
      color: 'text-red-600 dark:text-red-400'
    },
    {
      name: 'Custom Hooks',
      description: 'Reusable stateful logic with React hooks',
      icon: '🎣',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      name: 'Context API',
      description: 'Built-in state management solution',
      icon: '🔄',
      color: 'text-orange-600 dark:text-orange-400'
    }
  ];

  const features = [
    {
      title: 'Responsive Design',
      description: 'Works perfectly on desktop, tablet, and mobile devices',
      icon: '📱'
    },
    {
      title: 'Dark Mode Support',
      description: 'Toggle between light and dark themes for comfortable viewing',
      icon: '🌙'
    },
    {
      title: 'Component Architecture',
      description: 'Modular, reusable components following React best practices',
      icon: '🧩'
    },
    {
      title: 'State Management',
      description: 'Efficient state management using React hooks and Context API',
      icon: '🔧'
    },
    {
      title: 'API Integration',
      description: 'Seamless integration with external APIs and data fetching',
      icon: '🔗'
    },
    {
      title: 'Local Storage',
      description: 'Persistent data storage for tasks and user preferences',
      icon: '💾'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About This Project
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A comprehensive React application showcasing modern web development 
            practices, component architecture, and state management techniques.
          </p>
        </div>

        {/* Project Overview */}
        <Card className="mb-12">
          <Card.Header>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Project Overview
            </h2>
          </Card.Header>
          <Card.Content>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This React application serves as a comprehensive demonstration of modern 
                web development techniques and best practices. Built with React 18 and 
                leveraging the latest features like concurrent rendering, the project 
                showcases component-based architecture, efficient state management, and 
                responsive design principles.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The application features a clean, intuitive interface with support for 
                both light and dark themes, ensuring accessibility and user comfort across 
                different viewing preferences. Every component is designed to be reusable, 
                maintainable, and follows React best practices for optimal performance.
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Whether you're exploring the task management features, browsing through 
                the responsive layouts, or examining the code structure, this project 
                demonstrates practical implementation of modern React patterns and 
                contemporary web development standards.
              </p>
            </div>
          </Card.Content>
        </Card>

        {/* Technologies Used */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Technologies & Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <Card.Content className="text-center">
                  <div className="text-4xl mb-4">{tech.icon}</div>
                  <h3 className={`text-xl font-semibold mb-2 ${tech.color}`}>
                    {tech.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {tech.description}
                  </p>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <Card.Content className="flex items-start space-x-4">
                  <div className="text-3xl flex-shrink-0">{feature.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>

        {/* Development Highlights */}
        <Card className="mb-12">
          <Card.Header>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Development Highlights
            </h2>
          </Card.Header>
          <Card.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Architecture & Design
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Component-based modular architecture</li>
                  <li>• Separation of concerns and single responsibility</li>
                  <li>• Reusable UI components with consistent styling</li>
                  <li>• Responsive design using Tailwind CSS utilities</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Performance & UX
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Fast development and build times with Vite</li>
                  <li>• Optimized re-renders with React 18 features</li>
                  <li>• Smooth animations and transitions</li>
                  <li>• Cross-browser compatibility and accessibility</li>
                </ul>
              </div>
            </div>
          </Card.Content>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <Card.Content className="py-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Explore the Code
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Dive into the source code to see how these features are implemented. 
                The project structure is organized and well-documented to help you 
                understand modern React development patterns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => window.open('https://github.com/WayneChibeu/week-3-react-js-assignment-WayneChibeu-1', '_blank')}
                >
                  View on GitHub
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => window.open('https://reactjs.org', '_blank')}
                >
                  Learn React
                </Button>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;