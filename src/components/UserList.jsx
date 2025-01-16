import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addUser, claimPoints, getLeaderboard } from '../services/api';

const UserList = () => {
  const [newUserName, setNewUserName] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');

  const queryClient = useQueryClient();

  // Fetch leaderboard data
  const { data: leaderboard, isLoading, isError } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: getLeaderboard,
    onSuccess: (data) => {
      console.log('Leaderboard data:', data); // Log the leaderboard data
    },
  });

  // Mutation for adding a new user
  const addNewUser = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] }); // Refetch leaderboard after adding a user
    },
  });

  // Mutation for claiming points
  const claimUserPoints = useMutation({
    mutationFn: claimPoints,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] }); // Refetch leaderboard after claiming points
    },
  });

  const handleAddUser = () => {
    if (newUserName.trim()) {
      addNewUser.mutate(newUserName);
      setNewUserName('');
    }
  };

  const handleClaimPoints = (selectedUserId) => {
    if (selectedUserId) {
      console.log('Claiming points for user:', selectedUserId); // Debugging log
      claimUserPoints.mutate(selectedUserId);
    } else {
      console.error('No user selected');
    }
  };

  return (
    <div>
      <div>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">Select a user</option>
          {isLoading ? (
            <option key="loading">Loading...</option>
          ) : isError ? (
            <option key="error">Error loading users</option>
          ) : (
            leaderboard.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))
          )}
        </select>
        <button onClick={()=>handleClaimPoints(selectedUserId)}>
          {claimUserPoints.isLoading ? 'Claiming...' : 'Claim Points'}
        </button>
      </div>

      <input
        type="text"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
        placeholder="Enter user name"
      />
      <button onClick={handleAddUser} disabled={addNewUser.isLoading}>
        {addNewUser.isLoading ? 'Adding...' : 'Add User'}
      </button>
    </div>
  );
};

export default UserList;