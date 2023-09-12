import { createSlice } from "@reduxjs/toolkit";
import { getUserFromLocalStorage } from "../user/userSlice";
import { toast } from "react-toastify";

const defaultState = {
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
  initialState: defaultState,
  reducers: {
    resetInput: (state) => {
      // 當返回 defaultState 時，Redux Toolkit 會將它視為一個全新的狀態，並將其用於替換當前的狀態
      // 以確保狀態的不可變性和 Redux 的正確運作
      return defaultState;
    },
    editJob: (state, action) => {
      console.log(action.payload);
    },
    deleteJob: (state, action) => {
      console.log(action.payload);
    },
    addJob: (state, action) => {
      console.log(action.payload);
    },
  },
});

// console.log(userSlice);
// 輸出 slice.reducer
export default jobSlice.reducer;
// 輸出個別的 reducer
export const { resetInput } = jobSlice.actions;
