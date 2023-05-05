import { prisma } from '@/lib/prisma'
import { Snack, Prisma } from '@prisma/client'
import { SnacksRepository } from '../snacks-repository'

export class PrismaSnacksRepository implements SnacksRepository{
	async findById(id: string) {
		const snack = await prisma.snack.findUnique({
			where: {
				id,
			}
		})

		return snack
	}
	async findManyByUserId(userId: string, page: number) {
		const snacks = await prisma.snack.findMany({
			where: {
				user_id : userId
			},
			take: 20,
			skip: (page - 1) * 20,
		})

		return snacks
	}
	async findManySnacksOnDiet(userId: string, page: number) {
		const snacksOnDiet = await prisma.snack.findMany({
			where: {
				user_id : userId,
				on_diet: true,
			},
			take: 20,
			skip: (page - 1) * 20,
		})

		return snacksOnDiet
	}
	async countSnacksOnDietByUserId(userId: string){
		const countSnacks = await prisma.snack.count({
			where: {
				user_id : userId,
				on_diet: true,
			}
		})

		return countSnacks
	}
	async countSnacksOffDietByUserId(userId: string) {
		const countSnacks = await prisma.snack.count({
			where: {
				user_id : userId,
				on_diet: false,
			}
		})

		return countSnacks
	}
	async findBestSnackSequencePerDayWithinDiet(userId: string) {
		const snacksOnDiet = await prisma.snack.findMany({
			where: {
				user_id : userId,
				on_diet: true,
			}
		})

		snacksOnDiet.sort

	}
	async countByUserId(userId: string) {
		const countSnacks = await prisma.snack.count({
			where: {
				user_id : userId,
			}
		})

		return countSnacks
	}
	async create(data: Prisma.SnackUncheckedCreateInput) {
		const snack = await prisma.snack.create({
			data,
		})

		return snack
	}
	async save(data: Snack) {

		const snack = await prisma.snack.update({
			where: {
				id: data.id
			},
			data: data
		})

		return snack
	}
	async delete(id: string) {
		const snack = await prisma.snack.delete({
			where: {
				id
			}
		}) 

		return snack
	}
   
}