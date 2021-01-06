import { createSlice } from '@reduxjs/toolkit'
const axios = require('axios');

const initialState: any = {
    error: '', 
    fetching: false,
    currectInput: {

    }
};

const productReleases = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        inputReducer: (state, action) => {
            state.currectInput[action.payload.name] = action.payload.value
            console.log(action.payload, state)
        },
        fetchingReducer: async (state, action) => {
            //state.fetching = true;
    try {
        const res = await fetch('/auth/login', {
            method: 'POST',

            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: state.currectInput.email, password: state.currectInput.password})

        })


        const data = await res.json()

        if (!res.ok) {
            throw new Error(data.message || 'Error data')
        }
        console.log(res)
        console.log(data)
    }catch (error) {
        console.log(error.message)

    }
   // state.fetching = false;
            state = state
        }
    }
})

const { actions, reducer } = productReleases;

export const {
    inputReducer,
    fetchingReducer
} = actions;

export default reducer;