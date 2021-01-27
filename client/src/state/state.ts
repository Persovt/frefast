import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './auth.reducer'
import createSagaMiddleware from 'redux-saga'
import mySaga from '../sagas/saga'

const sagaMiddleware = createSagaMiddleware()


const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware]
})

sagaMiddleware.run(mySaga)

export default store