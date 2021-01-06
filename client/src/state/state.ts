import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './auth.reducer'
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()
import mySaga from '../sagas/saga'

const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware]
})

sagaMiddleware.run(mySaga)

export default store