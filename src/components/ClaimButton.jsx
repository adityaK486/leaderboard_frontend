// import React from 'react';
// import { claimPoints } from '../services/api';
// import { useQueryClient } from "@tanstack/react-query";

// const ClaimButton = ({ userId }) => {
    
//     const queryClient = useQueryClient();

//     const handleClaimPoints = async () => {
//         await claimPoints(userId);
//         queryClient.invalidateQueries('leaderboard');
//     };

//     return <button onClick={handleClaimPoints}>Claim Points</button>;
// };

// export default ClaimButton;
