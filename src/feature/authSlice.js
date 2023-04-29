import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import requests from '../helpers/Requests';
// import {}

// const initialState = []

export const loginUser = createAsyncThunk(
    'users/login',
    async ({ email, password }, thunkAPI) => {
        // console.log(email + password);
        try {
            const response = await fetch(
                requests.baseurl+requests.login,
                // 'http://127.0.0.1:8000/api/login',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );
            let data = await response.json();
            if (response.status === 200) {
                console.log('response', data.details);
                localStorage.setItem('token', data.details.token);
                localStorage.setItem('role', data.details.role);
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const fetchUserBytoken = createAsyncThunk(
    'users/fetchUserByToken',
    async ({ token }, thunkAPI) => {
        try {
            const response = await fetch(
                requests.baseurl+requests.fetchuserbytoken,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    },
                }
            );
            let data = await response.json();
            if (response.status === 200) {
                return { ...data };
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const authSlice = createSlice({

    name: 'auth',
    initialState: {
        name: '',
        email: '',
        role:'',
        status:'idle',
        isAuthenticated : false,
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
    },

    reducers: {
        clearAuthState: (state) => {
            // alert('clear');
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;

            return state;
        },
    },

    extraReducers: {
        [loginUser.fulfilled]: (state, { payload }) => {
            state.email = payload.email;
            // state.role =payload.role;
            state.isFetching = false;
            state.isSuccess = true;
            state.status = 'resolved'
            state.isAuthenticated = true;

            return state;
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.status = 'rejected';
            state.isAuthenticated = false;
            state.errorMessage = payload.message;
        },
        [loginUser.pending]: (state) => {
            state.isFetching = true;
            state.status = 'pending';
        },
        [fetchUserBytoken.pending]: (state) => {
            state.isFetching = true;
            state.status = 'pending';
        },
        [fetchUserBytoken.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.status = 'resolved';
            state.isAuthenticated = true;

            state.name = payload.user.name;
            state.email = payload.user.email;
            state.role = payload.user.role;
        },
        [fetchUserBytoken.rejected]: (state) => {
            console.log('fetchUserBytoken');
            state.isFetching = false;
            state.isError = true;
            state.status = 'rejected';
            state.isAuthenticated = false;
        },
    },
});

export const { clearAuthState } = authSlice.actions
export const userAuth = (state) => state.auth;
