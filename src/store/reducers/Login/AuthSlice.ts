import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../models/IUsers";
import { stateType } from "./reducerTypes";
import axios from "axios";

export const fetchUsers = createAsyncThunk("events/fetchUsers", async () => {
  const response = await axios.get<IUser[]>("../../public/users.json");
  return response.data;
});

export const LoginAPI = createAsyncThunk( 
  "login/LoginAPI",
  async ({ username, password }: IUser, { rejectWithValue }) => {
    const response = await axios.get<IUser[]>("../../../../public/users.json");
    const mockUser = response.data.find(
      (user) => user.username === username && user.password === password
    );
    if (mockUser) {
      localStorage.setItem("username", username);
      localStorage.setItem("auth", "true");
      console.log(2)
      return mockUser;
    } else {
      return rejectWithValue("No users found");
    }
  }
);

export const LogoutAPI = createAsyncThunk("login/LogoutAPI", () => {
  localStorage.removeItem("auth");
  localStorage.removeItem("username");
});

const initialState: stateType = {
  isAuth: false,
  isLoading: false,
  error: "",
  user: {} as IUser,
};
export const AuthSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<string>) => {
      state.isAuth = true;
      state.user.username = action.payload;
      state.error = "";
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginAPI.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginAPI.fulfilled, (state, action: any) => {
      state.user = { ...action.payload };
      state.isAuth = true;
      state.error = "";
    });
    builder.addCase(LoginAPI.rejected, (state, action: any) => {
      state.error = action.payload;
      state.isLoading = false;
      state.isAuth = false;
    });
    builder.addCase(LogoutAPI.fulfilled, (state) => {
      state.isAuth = false;
      state.user = {} as IUser;
      state.isLoading = false;
      state.error = "";
    });
  },
});
export const { logIn } = AuthSlice.actions;
export default AuthSlice.reducer;
