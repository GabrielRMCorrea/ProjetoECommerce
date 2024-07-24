import { users } from '@prisma/client';
import prisma from '../prisma-client'

const getOneByEmail = async (Email: string) => {
    return await prisma.users.findUnique({
        where: {email: Email}
    })
}

const getOne = async  (id:number) => {
    return await prisma.users.findUnique({
        where: {userId: Number(id)},
        omit: {
            password: true,
          },
    })
};

const getAll = async () => {
    return await prisma.users.findMany({
        omit: {
            password: true,
          },
    })
};

const create = async (userData : users) =>{
    return await prisma.users.create({
        data: userData,
        omit: {
            password: true,
          },
    })
};

const update = async (id:number, userData : users) =>{
    return await prisma.users.update({
        where:{ userId : id },
        data: userData,
        omit: {
            password: true,
          },
    })
};

const destroy = async (id: number) =>{
    return await prisma.users.delete({
        where: { userId : id},
        omit: {
            password: true,
          },
    })
};

export default {
    getOneByEmail,
    getOne,
    getAll,
    create,
    update,
    destroy
}