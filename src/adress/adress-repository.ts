import { adresses } from "@prisma/client";
import prisma from '../prisma-client'

const getAll = async  () => {
    return await prisma.adresses.findMany()
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
