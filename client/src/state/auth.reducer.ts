import { createSlice, createAction } from '@reduxjs/toolkit'


const initialState: any = {
    error: '', 
    fetching: false,
    currectInput: {

    },
    data: {

    },
    loggin: false
};

 export const AuthFetchServerAC = createAction('AUTH_FETCHED_SERVER')
 export const RegFetchServerAC = createAction('REG_FETCHED_SERVER')
 export const ValidateTokenFetchServerAC = createAction('VALIDATE_TOKEN_FETCHED_SERVER')

const productReleases = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        inputReducer: (state, action) => {
            state.currectInput[action.payload.name] = action.payload.value
            console.log(action.payload, state)
        },
        setDataAC: (state, action) => {
            state.data = action.payload
            console.log(action.payload, state)
        },
        ChangeAuthStatusAc: (state, action) => {
            state.loggin = action.payload
        }
        
        
    }
})

const { actions, reducer } = productReleases;

export const {
    inputReducer,
    setDataAC,ChangeAuthStatusAc

} = actions;

export default reducer;