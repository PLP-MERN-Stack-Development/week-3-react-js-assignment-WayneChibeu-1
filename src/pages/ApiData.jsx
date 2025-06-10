import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Search,
  User,
  MessageSquare,
  RefreshCw,
  AlertCircle,
  X,
  ChevronRight
} from 'lucide-react';

const ApiData = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  // Last element ref for infinite scrolling
  const lastPostElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // Fetch posts
  const fetchPosts = async (pageNum, search = '') => {
    try {
      setError(null);
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=10`);
      const data = await response.json();
      
      if (data.length > 0) {
        // If searching, filter the results
        const filteredData = search
          ? data.filter(post => 
              post.title.toLowerCase().includes(search.toLowerCase()) ||
              post.body.toLowerCase().includes(search.toLowerCase())
            )
          : data;

        setPosts(prev => pageNum === 1 ? filteredData : [...prev, ...filteredData]);
        setHasMore(data.length === 10); // If we got 10 items, there might be more
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError('Failed to fetch posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPosts([]);
      setPage(1);
      fetchPosts(1, searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Handle pagination
  useEffect(() => {
    if (page > 1) {
      fetchPosts(page, searchTerm);
    }
  }, [page]);

  // Initial load
  useEffect(() => {
    fetchPosts(1);
  }, []);

  // Fetch post details with user info
  const fetchPostDetails = async (postId) => {
    try {
      const [postResponse, userResponse] = await Promise.all([
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`),
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      ]);
      
      const postData = await postResponse.json();
      const commentsData = await userResponse.json();
      
      setSelectedPost({
        ...postData,
        comments: commentsData
      });
    } catch (err) {
      console.error('Error fetching post details:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
                  JSONPlaceholder API Demo
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400">
                Explore Posts
              </h1>
            </div>
          </div>

          {/* Search Section */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto mb-8 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center space-x-2"
            >
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  ref={index === posts.length - 1 ? lastPostElementRef : null}
                >
                  <Card 
                    className="group cursor-pointer hover:shadow-lg transition-shadow duration-200"
                    onClick={() => fetchPostDetails(post.id)}
                  >
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          User {post.userId}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                        {post.body}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          <span>5 comments</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center mt-8">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          )}

          {/* Post Details Modal */}
          <AnimatePresence>
            {selectedPost && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
                onClick={() => setSelectedPost(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="w-full max-w-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Card className="relative">
                    {/* Close Button */}
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <User className="w-5 h-5" />
                        </div>
                        <span className="text-gray-600 dark:text-gray-400">
                          User {selectedPost.userId}
                        </span>
                      </div>

                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {selectedPost.title}
                      </h2>

                      <p className="text-gray-600 dark:text-gray-400 mb-8">
                        {selectedPost.body}
                      </p>

                      {/* Comments Section */}
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Comments
                        </h3>
                        <div className="space-y-4">
                          {selectedPost.comments?.map(comment => (
                            <div key={comment.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                  <User className="w-3 h-3" />
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {comment.name}
                                </span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 text-sm">
                                {comment.body}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ApiData;