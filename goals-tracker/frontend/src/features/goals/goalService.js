import axios from "axios";

const API_URL = "/api/goals";

const createGoal = async (goalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goalData, config);
  return response.data;
};

// get user goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

// delete user goals
const deleteGoal = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/id`, config);
  return response.data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal
};

export default goalService;
