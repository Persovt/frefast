import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function* watchFetchDog() {
    yield takeEvery('FETCHED_SERVER', fetchServerAsync);
}

function* fetchServerAsync() {
    try {
        
    } catch (error) {
       
    }
}
export default watchFetchDog