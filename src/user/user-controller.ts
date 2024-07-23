import { Router, Request, Response } from "express";
import userRepository from "./user-repository";

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


//TODO create update delete
