import React, { createContext, useState, ReactNode } from 'react';
import type { Post, PostsContextType } from '../types';

const initialPosts: Post[] = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  topic: '',
  caption: '',
  imageUrl: null,
  videoUrl: null,
  status: 'empty',
  contentType: 'Image',
}));

export const PostsContext = createContext<PostsContextType | null>(null);

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
    const [editingPostId, setEditingPostId] = useState<number | null>(null);

    const updatePost = (updatedPost: Post) => {
        setPosts(currentPosts => currentPosts.map(p => p.id === updatedPost.id ? updatedPost : p));
    };
    
    return (
        <PostsContext.Provider value={{
            posts,
            updatePost,
            setPosts,
            setEditingPostId,
        }}>
            {children}
        </PostsContext.Provider>
    );
};