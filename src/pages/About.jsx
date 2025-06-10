import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { 
  Atom, 
  Palette, 
  Zap, 
  Navigation, 
  Anchor, 
  RefreshCw, 
  Smartphone, 
  Moon, 
  Puzzle, 
  Settings, 
  Link2, 
  HardDrive 
} from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  const technologies = [
    {
      name: 'React 18',
      description: 'Latest version of React with concurrent features',
      icon: <Atom className="w-6 h-6" />,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS framework for rapid UI development',
      icon: <Palette className="w-6 h-6" />,
      color: 'text-cyan-600 dark:text-cyan-400'
    },
    {
      name: 'Vite',
      description: 'Fast build tool and development server',
      icon: <Zap className="w-6 h-6" />,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      name: 'React Router',
      description: 'Declarative routing for React applications',
      icon: <Navigation className="w-6 h-6" />,
      color: 'text-red-600 dark:text-red-400'
    },
    {
      name: 'Custom Hooks',
      description: 'Reusable stateful logic with React hooks',
      icon: <Anchor className="w-6 h-6" />,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      name: 'Context API',
      description: 'Built-in state management solution',
      icon: <RefreshCw className="w-6 h-6" />,
      color: 'text-orange-600 dark:text-orange-400'
    }
  ];

  const features = [
    {
      title: 'Responsive Design',
      description: 'Works perfectly on desktop, tablet, and mobile devices',
      icon: <Smartphone className="w-6 h-6" />
    },
    {
      title: 'Dark Mode Support',
      description: 'Toggle between light and dark themes for comfortable viewing',
      icon: <Moon className="w-6 h-6" />
    },
    {
      title: 'Component Architecture',
      description: 'Modular, reusable components following React best practices',
      icon: <Puzzle className="w-6 h-6" />
    },
    {
      title: 'State Management',
      description: 'Efficient state management using React hooks and Context API',
      icon: <Settings className="w-6 h-6" />
    },
    {
      title: 'API Integration',
      description: 'Seamless integration with external APIs and data fetching',
      icon: <Link2 className="w-6 h-6" />
    },
    {
      title: 'Local Storage',
      description: 'Persistent data storage for tasks and user preferences',
      icon: <HardDrive className="w-6 h-6" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section with enhanced visual appeal */}
          <div className="relative text-center mb-24">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/20 dark:border-blue-700/20 backdrop-blur-sm mb-8">
                <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Modern React Development
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400">
                About This Project
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                A comprehensive showcase of modern web development practices, 
                focusing on component architecture and user experience.
              </p>
            </div>
          </div>

          {/* Technologies Section with enhanced cards */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 mb-6">
                Built With Modern Technologies
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Leveraging cutting-edge tools and frameworks for optimal performance
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {technologies.map((tech, index) => (
                <Card 
                  key={index} 
                  hover 
                  className="group p-6 transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 backdrop-blur-sm"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`${tech.color} p-3 rounded-xl bg-gray-100 dark:bg-gray-800 group-hover:scale-110 transition-transform duration-300`}>
                      {tech.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tech.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Features Section with micro-interactions */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 mb-6">
                Key Features & Capabilities
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Carefully crafted features that enhance user experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  hover 
                  className="group p-8 transform transition-all duration-300 hover:scale-105"
                >
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Development Highlights with enhanced visual hierarchy */}
          <Card className="relative overflow-hidden p-12 mb-24" gradient>
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400 mb-4">
                  Development Highlights
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Exploring the technical excellence behind our implementation
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 dark:border-gray-700/10 hover:border-white/20 dark:hover:border-gray-700/20 transition-colors">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></div>
                    Architecture & Design
                  </h3>
                  <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                    <li className="flex items-center space-x-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors"></div>
                      <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Component-based modular architecture</span>
                    </li>
                    <li className="flex items-center space-x-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors"></div>
                      <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Separation of concerns and single responsibility</span>
                    </li>
                    <li className="flex items-center space-x-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors"></div>
                      <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Reusable UI components with consistent styling</span>
                    </li>
                    <li className="flex items-center space-x-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-500 transition-colors"></div>
                      <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Responsive design using Tailwind CSS utilities</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 dark:border-gray-700/10 hover:border-white/20 dark:hover:border-gray-700/20 transition-colors">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mr-3"></div>
                    Performance & UX
                  </h3>
                  <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                    <li className="flex items-center space-x-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 group-hover:bg-green-500 transition-colors"></div>
                      <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Fast development and build times with Vite</span>
                    </li>
                    <li className="flex items-center space-x-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 group-hover:bg-green-500 transition-colors"></div>
                      <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Optimized re-renders with React 18 features</span>
                    </li>
                    <li className="flex items-center space-x-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 group-hover:bg-green-500 transition-colors"></div>
                      <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Smooth animations and transitions</span>
                    </li>
                    <li className="flex items-center space-x-3 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 group-hover:bg-green-500 transition-colors"></div>
                      <span className="group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Cross-browser compatibility and accessibility</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>

          {/* Call to Action with enhanced design */}
          <Card className="overflow-hidden mb-16">
            <div className="relative p-12 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10"></div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Ready to Start Building?
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  Use this project as a foundation for your next React application. 
                  Modern, scalable, and ready for production.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="primary"
                    size="lg"
                    className="group transform transition-all duration-300 hover:scale-105"
                  >
                    Get Started
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    className="group transform transition-all duration-300 hover:scale-105"
                  >
                    View Documentation
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;