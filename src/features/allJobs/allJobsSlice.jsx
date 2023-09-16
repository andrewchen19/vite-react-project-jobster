import { createSlice } from "@reduxjs/toolkit";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

const allJobsSlice = createSlice({
  name: "allJobs",
  initialState,
  reducers: {
    getAllJobs: (state, action) => {
      const { jobs, numOfPages, totalJobs } = action.payload;
      state.jobs = jobs;
      state.numOfPages = numOfPages;
      state.totalJobs = totalJobs;
      // 給 editJob page 來使用
      localStorage.setItem("data", JSON.stringify(action.payload));
    },
    getStats: (state, action) => {
      const { defaultStats, monthlyApplications } = action.payload;
      state.stats = defaultStats;
      state.monthlyApplications = monthlyApplications;
    },
    removeAllJobs: (state) => {
      localStorage.removeItem("data");
    },
  },
});

// console.log(userSlice);
// 輸出 slice.reducer
export default allJobsSlice.reducer;
// 輸出個別的 reducer
export const { getAllJobs, getStats, removeAllJobs } = allJobsSlice.actions;
