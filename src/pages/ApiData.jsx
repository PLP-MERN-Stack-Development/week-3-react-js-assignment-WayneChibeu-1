import React, { useState, useEffect } from 'react';
import { postsApi, usersApi } from '../api/posts';
import useApi from '../hooks/useApi';
import Card from '../components/Card';
import Button from '../components/Button';
import Loading from '../components/Loading';

const ApiData = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  const POSTS_PER_PAGE = 6;
  
  // Fetch posts and users
  const { data: posts, loading: postsLoading, error: postsError, refetch } = useApi(
    'https://jsonplaceholder.typicode.com/posts'
  );
  
  const { data: users, loading: usersLoading } = useApi(
    'https://jsonplaceholder.typicode.com/users'
  );

  // Filter posts based on search query
  useEffect(() => {
    if (posts) {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
      setPage(1); // Reset to first page when searching
    }
  }, [posts, searchQuery]);

  // Get user name by ID
  const getUserName = (userId) => {
    if (!users) return 'Unknown User';
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  // Paginate posts
  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  if (postsLoading || usersLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Loading size="lg" text="Loading posts and users..." />
      </div>
    );
  }

  if (postsError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="text-center py-12">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
            Error Loading Data
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {postsError}
          </p>
          <Button onClick={refetch}>
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            API Data Explorer
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Browse posts from JSONPlaceholder API with search and pagination
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {posts?.length || 0}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Total Posts</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {users?.length || 0}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Users</div>
          </Card>
          <Card className="text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {filteredPosts.length}
            </div>
            <div className="text-gray-600 dark:text-gray-400">Filtered Results</div>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search posts by title or content..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <Button onClick={() => setSearchQuery('')} variant="outline">
              Clear
            </Button>
          </div>
        </Card>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <Card className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No posts found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery ? 'Try adjusting your search terms.' : 'No posts available.'}
            </p>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedPosts.map((post) => (
                <Card key={post.id} hover className="h-full cursor-pointer" onClick={() => handlePostClick(post)}>
                  <Card.Header>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        #{post.id}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        By {getUserName(post.userId)}
                      </span>
                    </div>
                    <Card.Title className="line-clamp-2 text-lg">
                      {post.title}
                    </Card.Title>
                  </Card.Header>
                  <Card.Content>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                      {post.body}
                    </p>
                  </Card.Content>
                  <Card.Footer>
                    <Button size="sm" variant="outline" className="w-full">
                      Read More
                    </Button>
                  </Card.Footer>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mb-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={page === pageNum ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}

        {/* Post Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      Post #{selectedPost.id}
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      By {getUserName(selectedPost.userId)}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={closeModal}>
                    ✕
                  </Button>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedPost.title}
                </h2>
                
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedPost.body}
                </p>
                
                <div className="flex justify-end mt-6">
                  <Button onClick={closeModal}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiData;