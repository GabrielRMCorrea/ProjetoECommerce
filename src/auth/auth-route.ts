import { Request, Response } from "express";
import userRepository from '../user/user-repository'
import { users } from "@prisma/client";
import { Router } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const router = Router()

const LoginDevices: {[key:number] : string} ={}

export const validateDevice = async (id:number, ip : string | undefined) => {
  if (!id || !ip){
    return false
  }

  return LoginDevices[id] === ip  
}

router.post('/login',async (req: Request, res: Response)=>{
    
    try{

        const reqData : users = req.body
        
        if (!reqData.email || !reqData.password) {
            return res.status(400).send()
          }

        const user = await userRepository.getOneByEmail(reqData.email)

        if (!user) {
            return res.status(404).send('User not found.')
        }

        const isPasswordValid = bcrypt.compare(reqData.password, user.password)

        if (!isPasswordValid) {
            setTimeout(() => {
            return res.status(401).send( "Invalid Password" );
          }, 5000);
          }

        const token = jwt.sign(user.userId.toString(), process.env.JWTSECRET || '', {expiresIn: "8h"})

        if (req.ip){
            LoginDevices[user.userId] = req.ip
          }
            else{
              return res.status(500).send()
            }

        return res.json(token)
        

    } catch (error) {
        res.status(500).send('Internal server error')
    }
})

export default router
