import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

const initialState = {
  user: getUserFromLocalStorage(),
  isSidebarOpen: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = action.payload;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      state.isSidebarOpen = false;
      localStorage.removeItem("user");
      toast.warning("Logged out successfully", {
        icon: "🥹",
      });
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    editUser: (state, action) => {
      const updatedUser = action.payload;
      state.user = updatedUser;
    },
  },
});

// console.log(userSlice);
// 輸出 slice.reducer
export default userSlice.reducer;
// 輸出個別的 reducer
export const { loginUser, logoutUser, toggleSidebar, editUser } =
  userSlice.actions;
