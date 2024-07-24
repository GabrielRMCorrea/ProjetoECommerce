import { Router, Request, Response } from "express"
import { Prisma } from "@prisma/client"
import categoryRepository from "./category-repository"

const router = Router()

router.get('/', async (req : Request, res : Response)=>{
    try{
        const categories = await categoryRepository.getAll(req.query)
        return res.json(categories)
    } catch (error) {
        return res.status(500).send(error)
    }
})

router.get('/:id',async (req : Request, res : Response)=>{
    try{
        const id = Number(req.params.id)
        const category = categoryRepository.getOne(id)
        return res.json(category)

    } catch (error) {
        return res.status(500).send(error)
    }
})

router.post('/', async  (req : Request, res : Response)=>{
    try {

        const newCategory = await categoryRepository.create(req.body)
        res.status(201).json(newCategory)

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
        const updatedCategory = categoryRepository.update(id, req.body)
        return res.json(updatedCategory)

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
        const deletedCategory = categoryRepository.destroy(id)
        return res.json(deletedCategory)

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError || error instanceof  Prisma.PrismaClientValidationError) {
          return res.status(400).send(error.message);
        } else {
          return res.status(500).send();
        }
      }
})

export default router

