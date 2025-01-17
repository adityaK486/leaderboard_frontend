import axios from 'axios';


const api = axios.create({
  baseURL: 'https://leaderboard-backend-swart.vercel.app/api/users',
 
});


export const addUser = async (name) => {
    const response = await api.post('/create', { name });
    return response.data;
};

export const getUsers = async () => {
  const response = await api.get('/all');
  return response.data;
};

export const claimPoints = async (userId) => {
  const response = await api.post(`/claim/${userId}`);
  return response.data;
};

export const getLeaderboard = async () => {
  const response = await api.get('/ranks');
  return response.data;
};

export const getHistory = async (userId) => {
    const response = await api.get(`/history/${userId}`);
    return response.data;
};
