import axiosClient from "./axiosClient";

export const getNotices = () => axiosClient.get("/notices");
export const createNotice = (data) => axiosClient.post("/notices", data);
export const updateNotice = (id, data) => axiosClient.put(`/notices/${id}`, data);
export const deleteNotice = (id) => axiosClient.delete(`/notices/${id}`);