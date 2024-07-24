import { adresses } from "@prisma/client";
import prisma from '../prisma-client'

const getAll = async  (query : any) => {
    const whereClause : any = {}
    for (const i in query){
        whereClause[i] = Number(query[i]) ///precisa ser do tipo do campo validado pelo prisma, como fazer isso?
    }
    return await prisma.adresses.findMany({where: whereClause})
}

const getOne = async (id: number) => {
    return await prisma.adresses.findUnique({
        where: { adressId : id}
    })
}

const create = async (adressData: adresses) => {
    return await prisma.adresses.create({
        data: adressData
    })
}

const update = async (id: number, adressData: adresses) => {
    return await prisma.adresses.update({
        where: {adressId: id},
        data: adressData
    })
}

const destroy = async (id: number) => {
    return await prisma.adresses.delete({
        where: {adressId:id}
    })
}

export default {
    getAll,
    getOne,
    create,
    update,
    destroy
}
