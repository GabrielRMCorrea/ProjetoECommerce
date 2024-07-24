import prisma from '../prisma-client'
import { carts, products } from '@prisma/client';
import { error } from 'console';

const getOne = async  (id: number) => {
    return await prisma.carts.findUnique({
        where: {cartId: id},
        include: {product: true, user: true}
    })
};

const getAll = async (query:any) => {
    const whereClause : any = {}
    for (const i in query){
        whereClause[i] = Number(query[i]) ///precisa ser do tipo do campo validado pelo prisma, como fazer isso?
    }
    return await prisma.carts.findMany({where : whereClause, include: {product : true, user : true}})
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