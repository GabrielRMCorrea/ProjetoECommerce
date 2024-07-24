import { Router, Request, Response } from "express"
import userRepository from "./user-repository"
import bcrypt from 'bcrypt'
import userValidation from "./user-validation"
import { Prisma } from "@prisma/client"

const router = Router()

router.get('/', async (req : Request, res : Response) =>{
    try {
        const users = await userRepository.getAll()
        res.json(users)
    } catch (error) {
        res.status(500).send(error)
    }

} )

router.get('/:id', async (req : Request, res: Response) =>{
    try {    
        const user = await userRepository.getOne(Number(req.params.id));
        res.json(user);

      } catch (error) {
        res.status(500).send(error);
      }
} )

router.post('/', async (req : Request, res : Response) => {
    
    try {
        const userData = req.body

        const validation = userValidation.userCreateSchema.safeParse(userData)
        if (!validation.success) {
            return res.status(422).send(validation.error.issues)
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10)
        userData.password = hashedPassword

        const newUser = await userRepository.create(userData)
        res.status(201).json(newUser)
    } catch (error : any) {
        return res.status(400).send(error.message)
    }
})

router.put('/:id', async (req : Request, res : Response) => {
    try {
        const userData = req.body
        const id = Number(req.params.id)

        const validation = userValidation.userUpdatechema.safeParse(userData)
        if (!validation.success) {
            return res.status(422).send(validation.error.issues)
        }
        if( userData.password){
            const hashedPassword = await bcrypt.hash(userData.password, 10)
            userData.password = hashedPassword
        }

        const updatedUser = await userRepository.update(id,userData)
        res.status(201).json(updatedUser)
    } catch (error : any) {
        return res.status(400).send(error.message)
    }
})


router.delete('/:id', (req : Request, res : Response) => {
    try{
        const id = Number(req.params.id)
        const delUser = userRepository.destroy(id)
        return res.json(delUser)

    }catch (error : any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError || error instanceof  Prisma.PrismaClientValidationError) {
          res.status(400).send(error.message);
        } else {
          res.status(500).send();
        }
      }
})




export default router
