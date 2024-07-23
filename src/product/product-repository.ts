import { products } from '@prisma/client';
import prisma from '../prisma-client';



const getOne = async  (id: number) => {
    return await prisma.products.findUnique({
        where: {productId : id}
    })
};

const getAll = async () => {
    return await prisma.products.findMany()
};

const create = async (productData : products) =>{
    return await prisma.products.create({
        data: productData
    })
};

const update = async (id:number, productData: products) =>{
    return await prisma.products.update({
        where:{ productId: id},
        data: productData
    })
};

const destroy = async (id:number) =>{
    return await prisma.products.delete({
        where: {productId: id}
    })
};

export default {
    getOne,
    getAll,
    create,
    update,
    destroy
}