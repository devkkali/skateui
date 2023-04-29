import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import requests from '../helpers/Requests';


export const messagePopSlice = createSlice({

    name: 'messagePop',
    initialState: {
        isPop: false,
        messagetype: '',
        heading: '',
        content: '',
        dataArray: [],
    },

    reducers: {
        clearPopState: (state) => {
            // alert('clear');
            state.isPop = false;
            state.messagetype = '';
            state.heading = '';
            state.content = '';
            state.dataArray = [];

            return state;
        },
        setisPop: (state, { payload }) => {
            // console.log(payload);
            state.isPop = payload;
            return state;
        },
        setmessagetype: (state, { payload }) => {
            // console.log(payload);
            state.messagetype = payload;
            return state;
        },
        setheading: (state, { payload }) => {
            // console.log(payload);
            state.heading = payload;
            return state;
        },
        setcontent: (state, { payload }) => {
            // console.log(payload);
            state.content = payload;
            return state;
        },
        setdataArray: (state, { payload }) => {
            // console.log(payload);
            state.dataArray = payload;
            return state;
        },

    },
});

export const { clearPopState, setisPop, setmessagetype, setheading, setcontent, setdataArray } = messagePopSlice.actions
export const messagePop = (state) => state.messagePop;
