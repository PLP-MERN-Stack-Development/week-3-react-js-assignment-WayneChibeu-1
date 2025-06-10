import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { motion } from 'framer-motion';
import { 
  ListTodo, 
  Moon, 
  RefreshCw, 
  Sparkles,
  ChevronRight,
  Plus,
  CheckCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

const Home = () => {
  const [isHovered, setIsHovered] = useState(null);

  const features = [
    {
      icon: <Plus className="w-6 h-6" />,
      title: "Create Tasks",
      description: "Add new tasks with titles, descriptions, and due dates",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Track Progress",
      description: "Monitor task completion and track your productivity",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Stay Organized",
      description: "Keep your tasks organized with priority levels and categories",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Hero Section */}
          <div className="relative text-center mb-24">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            
            <motion.div 
              className="relative z-10"
              variants={itemVariants}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/20 dark:border-blue-700/20 backdrop-blur-sm mb-8">
                <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Task Management Made Simple
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400">
                Organize Your Tasks<br />with Ease
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
                A modern task management application built with React.<br />
                Simple, intuitive, and designed for productivity.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="primary"
                  size="lg"
                  className="group transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  onClick={() => window.location.href = '/tasks'}
                >
                  <span className="flex items-center">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="group transform transition-all duration-300 hover:scale-105"
                  onClick={() => window.location.href = '/about'}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onHoverStart={() => setIsHovered(index)}
                onHoverEnd={() => setIsHovered(null)}
              >
                <Card 
                  className={`
                    relative overflow-hidden p-8 
                    transform transition-all duration-300 
                    hover:scale-105 hover:-translate-y-1 
                    ${isHovered === index ? 'shadow-lg' : ''}
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 hover:opacity-5 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className={`
                      inline-flex items-center justify-center 
                      w-16 h-16 rounded-2xl mb-6 text-white
                      bg-gradient-to-br ${feature.color}
                      transform transition-all duration-300
                      ${isHovered === index ? 'scale-110 rotate-3' : ''}
                      shadow-lg
                    `}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div 
            variants={itemVariants}
            className="text-center"
          >
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10"></div>
              <div className="relative z-10 p-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Ready to Get Organized?
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  Start managing your tasks more efficiently today.
                  Simple, intuitive, and designed for your productivity.
                </p>
                <Button 
                  variant="primary"
                  size="lg"
                  className="group transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  onClick={() => window.location.href = '/tasks'}
                >
                  <span className="flex items-center">
                    Start Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;