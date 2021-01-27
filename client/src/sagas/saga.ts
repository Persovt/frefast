import { strict } from 'assert';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import Cookies from 'universal-cookie';
 import {setDataAC,ChangeAuthStatusAc} from '../state/auth.reducer'

const cookies = new Cookies();


function* watchFetchDog() {
    yield takeEvery('AUTH_FETCHED_SERVER', AuthfetchServerAsync);
    yield takeEvery('REG_FETCHED_SERVER', RegfetchServerAsync);
    yield takeEvery('VALIDATE_TOKEN_FETCHED_SERVER', ValidateTokenfetchServerAsync)
}
function* RegfetchServerAsync(action: any) {
    
    try {
      
            

        const res = yield fetch('/auth/register', {
            method: 'POST',

            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: action.payload.email, password: action.payload.password})

        })


        const data = yield res.json()

        if (!res.ok) {
            throw new Error(data.message || 'Error data')
        }
        
        
        console.log( data )
    }catch (error) {
        console.log(error.message)

    }
}
function* AuthfetchServerAsync(action: any) {
    
    try {
        const fp = yield FingerprintJS.load();
              const result = yield fp.get();
            

        const res = yield fetch('/auth/login', {
            method: 'POST',

            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: action.payload.email, password: action.payload.password, visitorId: result.visitorId})

        })


        const data = yield res.json()

        if (!res.ok) {
            throw new Error(data.message || 'Error data')
        }
        
        yield ValidateTokenfetchServerAsync()
        console.log( data )
    }catch (error) {
        console.log(error.message)

    }
}
function* ValidateTokenfetchServerAsync() {
    
    try {
        
       console.log('hoi')

           //console.log(cookies.get('accesToken'))
       
            const res = yield fetch('/auth/verifyToken', {
                method: 'POST',

                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({accesToken: cookies.get('accesToken')})

            })


            const data = yield res.json()

            if (!res.ok) {
                throw new Error(data.message || 'Error data')
            }
            
            yield put(setDataAC(data))
            yield put(ChangeAuthStatusAc(true))
    

        
    }catch (error) {  
        console.log(213222)  
        yield  RefreshTokenfetchServerAsync()
        console.log(error.message)

    }
}

function* RefreshTokenfetchServerAsync() {
    
    try {
       

        const fp = yield FingerprintJS.load();
        const result = yield fp.get();

            const res = yield fetch('/auth/refresh-tokens', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({refreshToken: cookies.get('refreshToken'),visitorId: result.visitorId})

            })


            const data = yield res.json()

            if (!res.ok) {
                throw new Error(data.message || 'Error refresh token')
            }
            ValidateTokenfetchServerAsync()

    }catch (error) {
       
        yield put(ChangeAuthStatusAc(false))
        console.log(error.message)

    }
}

export default watchFetchDog