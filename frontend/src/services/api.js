import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const analyzeComplaint = (data) =>
  api.post("/analyze", data);

export const saveComplaint = (data) =>
  api.post("/complaints", data);

export const getComplaints = () =>
  api.get("/complaints");

export const uploadPDF = (formData) =>
  api.post("/upload-pdf", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateStatus = (id, status) =>
  api.patch(`/complaints/${id}/status?status=${status}`);

// ⭐ NEW
export const refineComplaint = (data) =>
  api.post("/refine", data);

export default api;