import {createSlice} from '@reduxjs/toolkit'
// import {}

const initialState = []

export const foodSlice = createSlice({

    name: 'food',
    initialState,

    reducers: {

        addToFood: (state = initialState, {payload}) => {
            return [...state, ...payload]
        },

        // aru reducers like remove, bla bla also same

        // addToFood: (state = initialState, {payload}) => {
        //     return [...state, ...payload]
        // },

    },

})

export const {addToFood} = foodSlice.actions
export const authState = (state) => state.auth
export default foodSlice.reducer