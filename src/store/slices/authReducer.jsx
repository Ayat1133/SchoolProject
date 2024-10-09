import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const postSignUp = createAsyncThunk(
    "main/signup/post",
    async (body,{rejectWithValue}) => {
      try {
        const response = await axios.post(`${BASE_URL}/auth/registration/`, body);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );

  export const postLogin = createAsyncThunk(
    "main/login/post",
    async (body, {rejectWithValue}) => {
      try {
        const response = await axios.post(`${BASE_URL}/auth/login/`, body);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );
 

  export const postLogout = createAsyncThunk(
    "main/logout/post",
    async (body,{rejectWithValue}) => {
      try {
        const response = await axios.post(`${BASE_URL}/auth/logout/`);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );





  export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,
        isAuth: localStorage.getItem('token') ? true : false,
        isTeacher: false,
        loginLoading:false,
        loginError:false,
        logoutLoading:false,
        logoutError:false,
    },
    reducers: {
        logout: (state) => {
            state.token = null;
            localStorage.clear()
        },
    },
    extraReducers: (builder) => {
          builder.addCase(postLogin.pending, (state) => {
              state.loginLoading = true;
              state.loginError = false;
          });
          builder.addCase(postLogin.fulfilled, (state, action) => {
            state.loginLoading = false;
            state.loginError = false;
            state.loginData = action?.payload;
            const data = action?.payload;
            state.token = data?.access;
            state.isAuth = true;
            state.isTeacher = data?.user?.account_type === "teacher" ? true : false;
            data?.user?.account_type === "teacher" && localStorage.setItem("isTeacher", true)
            data?.user?.account_type === "student" && localStorage.setItem("isTeacher", false)
            data?.access && localStorage.setItem("token", data?.access)
            data?.access && localStorage.setItem("refershToken", data?.refresh)
          });
          builder.addCase(postLogin.rejected, (state, action) => {
            state.loginLoading = false;
            state.loginError = action.payload;
          });

          builder.addCase(postLogout.pending, (state) => {
            state.logoutLoading = true;
            state.logoutError = false;
          });
          builder.addCase(postLogout.fulfilled, (state, action) => {
            state.logoutLoading = false;
            state.logoutError = false;
            state.logoutData = action.payload;
            localStorage.clear();
            state.token = null;
            state.isAuth = false;
          });
          builder.addCase(postLogout.rejected, (state, action) => {
            state.logoutLoading = false;
            state.logoutError = action.payload;
          });
        
      },
})

export const authReducer = authSlice.reducer;
export const { logout, saveToken  } = authSlice.actions;