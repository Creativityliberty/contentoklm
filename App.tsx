import React from 'react';
import { AppProvider } from './contexts/AppContext';
import { PostsProvider } from './contexts/PostsContext';
import { ToastProvider } from './contexts/ToastContext';
import AppContent from './AppContent'; // We'll create this new component

function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <PostsProvider>
          <AppContent />
        </PostsProvider>
      </AppProvider>
    </ToastProvider>
  );
}

export default App;