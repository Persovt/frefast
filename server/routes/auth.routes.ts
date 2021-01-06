import { Router } from 'express';
const AuthRouter = Router();

AuthRouter.post('/register', async function(req, res) {
    try{
        let body = req.body

    }catch (error){
        res.send(error)
    }
});

export default AuthRouter