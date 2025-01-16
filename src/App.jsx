import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserList from './components/UserList';
import Leaderboard from './components/Leaderboard';

// Initialize QueryClient
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>Leaderboard App</h1>
        <UserList />
        <Leaderboard />
      </div>
    </QueryClientProvider>
  );
};

export default App;
