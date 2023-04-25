import { registerSchema, loginSchema } from "../schemas/allschemas";
import db from "../database/database.js";
import bcrypt from "bcrypt";

export async function register(req,res){
    const {name, email, password} = req.body;
    const registerValidate = registerSchema.validate(req.body, {abortEarly: false});
    if(registerValidate.error){
        const errors = validation.error.details.map((detail)=>detail.message);
        return res.status(422).send(errors)
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
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    }
}

