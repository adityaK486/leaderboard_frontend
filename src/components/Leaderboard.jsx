import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLeaderboard, getHistory } from '../services/api';

const Leaderboard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const openDialog = (userId) => {
    setSelectedUserId(userId);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedUserId(null);
  };

  // Fetch leaderboard data
  const { data: leaderboard, isLoading, error } = useQuery({
    queryKey: ['leaderboard'], // Query key is still an array, which is valid
    queryFn: getLeaderboard, // The fetch function to call
  });

  // Fetch user's history dynamically based on selectedUserId
  const { data: history, isLoading: loadingHistory, error: historyError } = useQuery({
    queryKey: ['history', selectedUserId], // Query key is an array containing history and userId
    queryFn: () => getHistory(selectedUserId), // Fetch the history based on userId
    enabled: !!selectedUserId, // Only run this query if selectedUserId is not null
  });

  if (isLoading) return <div>Loading leaderboard...</div>;
  if (error) return <div>Error loading leaderboard</div>;

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard.map((user) => (
          <li key={user._id}>
            {user.rank}. {user.name} - {user.totalPoints} points
            <button onClick={() => openDialog(user._id)} className="open-dialog-btn">
              History
            </button>
          </li>
        ))}
      </ul>

      {isDialogOpen && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            {loadingHistory ? (
              <div>Loading history...</div>
            ) : historyError ? (
              <div>Error loading history</div>
            ) : (
              history.map((entry) => (
                <p key={entry._id}>
                  Points Claimed: {entry.pointsClaimed} at {entry.claimedAt}
                </p>
              ))
            )}
            <button onClick={closeDialog} className="close-dialog-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
