import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const getUser = createAsyncThunk(
  "main/user/get",
  async (body,{ getState, rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/user/`, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
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
export const getExamDate = createAsyncThunk(
  "main/exam-dates/get",
  async (body,{ getState, rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/exam-dates/`, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
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
export const getCourses = createAsyncThunk(
  "main/courses/get",
  async (body,{ getState, rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/courses/`, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
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
export const postMaterial = createAsyncThunk(
  "main/material/post",
  async (data,{ getState, rejectWithValue }) => {
    const postForm = new FormData();
    data?.name && postForm.append("name", data?.name);
    data?.file && postForm.append("file", data.file);
   
    try {
      const response = await axios.post(`${BASE_URL}/api/material/`,postForm, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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
export const postGrades = createAsyncThunk(
  "main/grades/post",
  async (data,{ getState, rejectWithValue }) => {
    const postForm = new FormData();
    data?.student && postForm.append("student", data?.student);
    data?.grade && postForm.append("grade", data?.grade);
    data?.file && postForm.append("file", data.file);
   
    try {
      const response = await axios.post(`${BASE_URL}/api/grade/`,postForm, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
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
export const getGrades = createAsyncThunk(
  "main/grades/get",
  async (body,{ getState, rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/grade/`, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
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

export const postRequest = createAsyncThunk(
  "main/request/post",
  async (data,{ getState, rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/request/create/`,data, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
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
export const editRequest = createAsyncThunk(
  "main/request/patch",
  async (data,{ getState, rejectWithValue }) => {
    try {
      const response = await axios.patch(`${BASE_URL}/api/request/${data?.id}/`,data, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
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

export const postMessage = createAsyncThunk(
  "main/message/post",
  async (data,{ getState, rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/message/create/`,data, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
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
export const postQuestion = createAsyncThunk(
  "main/question/post",
  async (data,{ getState, rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/question/create/`,data, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
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
export const postExam = createAsyncThunk(
  "main/exam/post",
  async (data,{ getState, rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/exam/create/`,data, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
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
export const postAnswers = createAsyncThunk(
  "main/answers/post",
  async (data,{ getState, rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/exam/submit/`,data, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
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

  export const mainSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,
        isAuth: localStorage.getItem('token') ? true : false,
        userData:null,
        userLoading:false,
        userError:false,
        examDatesLoading:false,
        examDatesError:false,
        examDates:null,
        coursesData:null,
        coursesLoading:false,
        coursesError:false,
        addMaterialLoading:false,
        addMaterialError:false,
        addGradesLoading:false,
        addGradesError:false,
        gradesData:null,
        gradesLoading:false,
        gradesError:false,
        addRequestLoading:false,
        addRequestError:false,
        editRequestLoading:false,
        editRequestError:false,
        addMessageLoading:false,
        addMessageError:false,
        addQuestionLoading:false,
        addQuestionError:false,
        addExamLoading:false,
        addExamError:false,
        addAnswresLoading:false,
        addAnswersError:false,
      
    },
    reducers: {},
    extraReducers: (builder) => {
          builder.addCase(getUser.pending, (state) => {
            state.userLoading = true;
            state.userError = false;
          });
          builder.addCase(getUser.fulfilled, (state, action) => {
            state.userLoading = false;
            state.userError = false;
            state.userData = action.payload;
          });
          builder.addCase(getUser.rejected, (state, action) => {
            state.userLoading = false;
            state.userError = action.payload;
          });
          builder.addCase(getExamDate.pending, (state) => {
            state.examDatesLoading = true;
            state.examDatesError = false;
          });
          builder.addCase(getExamDate.fulfilled, (state, action) => {
            state.examDatesLoading = false;
            state.examDatesError = false;
            state.examDates = action.payload;
          });
          builder.addCase(getExamDate.rejected, (state, action) => {
            state.examDatesLoading = false;
            state.examDatesError = action.payload;
          });
          builder.addCase(getCourses.pending, (state) => {
            state.coursesLoading = true;
            state.coursesError = false;
          });
          builder.addCase(getCourses.fulfilled, (state, action) => {
            state.coursesLoading = false;
            state.coursesError = false;
            state.coursesData = action.payload;
          });
          builder.addCase(getCourses.rejected, (state, action) => {
            state.coursesLoading = false;
            state.coursesError = action.payload;
          });
          builder.addCase(postMaterial.pending, (state) => {
            state.addMaterialLoading = true;
            state.addMaterialError = false;
          });
          builder.addCase(postMaterial.fulfilled, (state, action) => {
            state.addMaterialLoading = false;
            state.addMaterialError = false;
          });
          builder.addCase(postMaterial.rejected, (state, action) => {
            state.addMaterialLoading = false;
            state.addMaterialError = action.payload;
          });
          builder.addCase(postGrades.pending, (state) => {
            state.addGradesLoading = true;
            state.addGradesError = false;
          });
          builder.addCase(postGrades.fulfilled, (state, action) => {
            state.addGradesLoading = false;
            state.addGradesError = false;
          });
          builder.addCase(postGrades.rejected, (state, action) => {
            state.addGradesLoading = false;
            state.addGradesError = action.payload;
          });
          builder.addCase(getGrades.pending, (state) => {
            state.gradesLoading = true;
            state.gradesError = false;
          });
          builder.addCase(getGrades.fulfilled, (state, action) => {
            state.gradesLoading = false;
            state.gradesError = false;
          });
          builder.addCase(getGrades.rejected, (state, action) => {
            state.gradesLoading = false;
            state.gradesError = action.payload;
          });
          builder.addCase(postRequest.pending, (state) => {
            state.addRequestLoading = true;
            state.addRequestError = false;
          });
          builder.addCase(postRequest.fulfilled, (state, action) => {
            state.addRequestLoading = false;
            state.addRequestError = false;
          });
          builder.addCase(postRequest.rejected, (state, action) => {
            state.addRequestLoading = false;
            state.addRequestError = action.payload;
          });
          builder.addCase(editRequest.pending, (state) => {
            state.editRequestLoading = true;
            state.editRequestError = false;
          });
          builder.addCase(editRequest.fulfilled, (state, action) => {
            state.editRequestLoading = false;
            state.editRequestError = false;
          });
          builder.addCase(editRequest.rejected, (state, action) => {
            state.editRequestLoading = false;
            state.editRequestError = action.payload;
          });
          builder.addCase(postMessage.pending, (state) => {
            state.addMessageLoading = true;
            state.addMessageError = false;
          });
          builder.addCase(postMessage.fulfilled, (state, action) => {
            state.addMessageLoading = false;
            state.addMessageError = false;
          });
          builder.addCase(postMessage.rejected, (state, action) => {
            state.addMessageLoading = false;
            state.addMessageError = action.payload;
          });
          builder.addCase(postQuestion.pending, (state) => {
            state.addQuestionLoading = true;
            state.addQuestionError = false;
          });
          builder.addCase(postQuestion.fulfilled, (state, action) => {
            state.addQuestionLoading = false;
            state.addQuestionError = false;
          });
          builder.addCase(postQuestion.rejected, (state, action) => {
            state.addQuestionLoading = false;
            state.addQuestionError = action.payload;
          });
          builder.addCase(postExam.pending, (state) => {
            state.addExamLoading = true;
            state.addExamError = false;
          });
          builder.addCase(postExam.fulfilled, (state, action) => {
            state.addExamLoading = false;
            state.addExamError = false;
          });
          builder.addCase(postExam.rejected, (state, action) => {
            state.addExamLoading = false;
            state.addExamError = action.payload;
          });
          builder.addCase(postAnswers.pending, (state) => {
            state.addAnswresLoading = true;
            state.addAnswersError = false;
          });
          builder.addCase(postAnswers.fulfilled, (state, action) => {
            state.addAnswresLoading = false;
            state.addAnswersError = false;
          });
          builder.addCase(postAnswers.rejected, (state, action) => {
            state.addAnswresLoading = false;
            state.addAnswersError = action.payload;
          });
        
      
  
      },
})

export const mainReducer = mainSlice.reducer;