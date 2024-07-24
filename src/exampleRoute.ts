import { Router, Request, Response } from "express"
import { Prisma } from "@prisma/client"


const router = Router()

const entityRepository : any  = undefined

router.get('/', async (req : Request, res : Response)=>{
    try{
        const data = await entityRepository.getAll(req.query)
        return res.json(data)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.get('/:id',async (req : Request, res : Response)=>{
    try{
        const id = Number(req.params.id)
        const data = entityRepository.getOne(id)
        return res.json(data)

    } catch (error) {
        return res.status(500).send(error)
    }
})

router.post('/', async  (req : Request, res : Response)=>{
    try {

        const newData = await entityRepository.create(req.body)
        res.status(201).json(newData)

      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError || error instanceof  Prisma.PrismaClientValidationError) {
          return res.status(400).send(error.message);
        } else {
          return res.status(500).send()
        }
      }
})

router.put('/:id',async  (req : Request, res : Response)=>{
    try{
        const id = Number(req.params.id)
        const updatedData = entityRepository.update(id, req.body)
        return res.json(updatedData)

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError || error instanceof  Prisma.PrismaClientValidationError) {
          return res.status(400).send(error.message);
        } else {
          return res.status(500).send();
        }
      }
})

router.delete('/:id', async  (req : Request, res : Response)=>{
    try{
        const id = Number(req.params.id)
        const deletedData = entityRepository.destroy(id)
        return res.json(deletedData)

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError || error instanceof  Prisma.PrismaClientValidationError) {
          return res.status(400).send(error.message);
        } else {
          return res.status(500).send();
        }
      }
})

export default router

