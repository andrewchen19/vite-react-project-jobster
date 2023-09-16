import { createSlice } from "@reduxjs/toolkit";
import { getUserFromLocalStorage } from "../user/userSlice";

const initialState = {
  position: "",
  company: "",
  jobLocation: getUserFromLocalStorage()?.location || "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    updateJobLocation: (state) => {
      state.jobLocation = getUserFromLocalStorage()?.location || "";
    },
  },
});

// console.log(userSlice);
// 輸出 slice.reducer
export default jobSlice.reducer;
// 輸出個別的 reducer
export const { updateJobLocation } = jobSlice.actions;
