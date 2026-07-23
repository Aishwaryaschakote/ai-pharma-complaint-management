import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  complaint: "",
  result: null,
  complaints: [],
};

const complaintSlice = createSlice({
  name: "complaint",

  initialState,

  reducers: {
    setComplaint: (state, action) => {
      state.complaint = action.payload;
    },

    setResult: (state, action) => {
      state.result = action.payload;
    },

    setComplaints: (state, action) => {
      state.complaints = action.payload;
    },

    resetComplaint: (state) => {
      state.complaint = "";
      state.result = null;
    },
  },
});

export const {
  setComplaint,
  setResult,
  setComplaints,
  resetComplaint,
} = complaintSlice.actions;

export default complaintSlice.reducer;