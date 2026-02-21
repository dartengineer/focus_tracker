import api from "../../services/api";

export const getHabits = async () => {
  const res = await api.get("/habits");
  return res.data;
};

export const createHabit = async (data) => {
  const res = await api.post("/habits", data);
  return res.data;
};

export const completeHabit = async (id) => {
  const res = await api.put(`/habits/${id}/complete`);
  return res.data;
};

export const deleteHabit = async (id) => {
  const res = await api.delete(`/habits/${id}`);
  return res.data;
};
