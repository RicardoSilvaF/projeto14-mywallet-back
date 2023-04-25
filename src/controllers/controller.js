import { registerSchema, loginSchema } from "../schemas/allschemas";
import db from "../database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from 'uuid';

export async function register(req, res){
    const {name, email, password} = req.body;
    const registerValidate = registerSchema.validate(req.body, {abortEarly: false});
    if(registerValidate.error){
        const errors = validation.error.details.map((detail)=>detail.message);
        res.status(422).send(errors)
        return 
    }
    const checkDuplicateUser = await db.collection('users').findOne({email});
    if(checkDuplicateUser){
        res.Status(409);
        return('Usuário já possui cadastro');
    }
    else{
        try{
            const hash = bcrypt.hashSync(password, 10);
            await db.collection('users').insertOne({name,email,password:hash});
            res.sendStatus(201);
            return;
        }
        catch (err) {
            res.status(500).send(err.message);
            return; 
        }
    }
}

export async function login(req, res){
    const {email, password} = req.body;
    const loginValidate = loginSchema.validate(req.body, {abortEarly: false});
    if(loginValidate){
        const errors = validation.error.details.map((detail)=>detail.message);
        res.status(422).send(errors);
        return 
    }
    const checkUser = await db.collection('users').findOne({email});
    if(!checkUser){
        res.status(404);
        return('Email não cadastrado');
    }
    const passwordCheck = bcrypt.compareSync(password, checkUser.password)
    if(!passwordCheck){
        res.sendStatus(401);
        return ('Senha incorreta');
    }
    try{
        const token = uuidV4();
        res.status(200).send(token);
        return;
    }
    catch (err) {
        res.status(500).send(err.message);
        return; 
    }
}
