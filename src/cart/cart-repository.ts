import prisma from '../prisma-client'
import { carts } from '@prisma/client';

const getOne = async  (id: number) => {
    return await prisma.carts.findUnique({
        where: {cartId: id}
    })
};

const getAll = async () => {
    return await prisma.carts.findMany()
};

const create = async (cartData: carts) =>{
    return await prisma.carts.create({
        data: cartData
    })
};

const update = async (id:number, cartData: carts) =>{
    return await prisma.carts.update({
        where: {cartId : id},
        data: cartData
    })
};

const destroy = async (id: number) =>{
    return await prisma.carts.delete({
        where: {cartId : id}
    })
};

export default {
    getOne,
    getAll,
    create,
    update,
    destroy
}