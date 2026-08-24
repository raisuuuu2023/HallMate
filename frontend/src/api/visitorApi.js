import axiosClient from "./axiosClient";

export const getVisitorRequests = () => axiosClient.get("/visitors");
export const createVisitorRequest = (data) => axiosClient.post("/visitors", data);
export const updateVisitorStatus = (id, status) =>
  axiosClient.patch(`/visitors/${id}`, { status });