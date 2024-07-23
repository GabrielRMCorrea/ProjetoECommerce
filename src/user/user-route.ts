import { Router, Request, Response } from "express";
import userRepository from "./user-repository";
import bcrypt from 'bcrypt'

const router = Router()

router.get('/', async (req : Request, res : Response) =>{
    try {
        const users = await userRepository.getAll()
        res.send(users)
    } catch (error) {
        res.status(500).send(error)
    }

} )

router.get('/:id', async (req : Request, res: Response) =>{
    try {    
        const user = await userRepository.getOne(Number(req.params.id));
        res.send(user);

      } catch (error) {
        res.status(500).send(error);
      }
} )

router.post('/', async (req : Request, res : Response) => {
    
    //TODO VALIDATION
    try {
        const userData = req.body

        const hashedPassword = await bcrypt.hash(userData.password, 10)
        userData.password = hashedPassword

        const newUser = await userRepository.create(userData)
        res.status(201).send(newUser)
    } catch (error : any) {
        return res.status(400).send(error.message)
    }
})

//TODO create update delete



export default router
