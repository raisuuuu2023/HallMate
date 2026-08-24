import axiosClient from "./axiosClient";

// student side
export const getMyFees = () => axiosClient.get("/fees/my");

// admin side
export const getAllFees = () => axiosClient.get("/fees");
export const createFee = (data) => axiosClient.post("/fees", data);
export const updateFeeStatus = (id, data) => axiosClient.put(`/fees/${id}/status`, data);