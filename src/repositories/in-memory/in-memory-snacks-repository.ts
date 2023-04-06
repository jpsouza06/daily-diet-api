import { Snack, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { SnacksRepository } from '../snacks-repository'

export class InMemorySnacksRepository implements SnacksRepository{
	public items: Snack[] = []
   
	async findById(id: string) {
		const snack = this.items.find(item => item.id === id)

		if (!snack) {
			return null
		}

		return snack
	}

	async findManyByUserId(userId: string, page: number) {
		return this.items
			.filter(item => item.user_id === userId)
			.slice((page -1) * 20, page * 20) 
	}
	
	async create(data: Prisma.SnackUncheckedCreateInput) {
		const snack = {
			id: randomUUID(),
			name: data.name,
			description: data.description,
			date_time: data.date_time,
			on_diete: data.on_diete,
			created_at: new Date(),
			user_id: data.user_id
		}
		
		this.items.push(snack)
		
		return snack
	}
}