import { addresses } from "@prisma/client";
import prisma from '../prisma-client'




const getAll = async  (query : any) => {
    const whereClause : any = {}
    for (const i in query){
        whereClause[i] = Number(query[i]) ///precisa ser do tipo do campo validado pelo prisma, como fazer isso?
    }
    return await prisma.addresses.findMany({where: whereClause})
}

const getOne = async (id: number) => {
    return await prisma.addresses.findUnique({
        where: { addressId : id}
    })
}

const create = async (adressData: addresses) => {
    return await prisma.addresses.create({
        data: adressData
    })
}

const update = async (id: number, adressData: addresses) => {
    return await prisma.addresses.update({
        where: {addressId: id},
        data: adressData
    })
}

const destroy = async (id: number) => {
    return await prisma.addresses.delete({
        where: {addressId:id}
    })
}

export default {
    getAll,
    getOne,
    create,
    update,
    destroy
}
