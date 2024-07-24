import { categories } from '@prisma/client';
import prisma from '../prisma-client'

const getOne = async  (id: number) => {
    return await prisma.categories.findUnique({
        where: { categoryId : id}
    })
};

const getAll = async (query:any) => {
    const whereClause : any = {}
    for (const i in query){
        whereClause[i] = Number(query[i]) ///precisa ser do tipo do campo validado pelo prisma, como fazer isso?
    }
    return await prisma.categories.findMany({where:whereClause})
};

const create = async (categoryData: categories) =>{
    return await prisma.categories.create({
        data: categoryData
    })
};

const update = async (id:number, categoryData: categories) =>{
    return await prisma.categories.update({
        where: {categoryId: id},
        data: categoryData
    })
};

const destroy = async (id: number) =>{
    return await prisma.categories.delete({
        where: {categoryId: id}
    })
};

export default {
    getOne,
    getAll,
    create,
    update,
    destroy
}