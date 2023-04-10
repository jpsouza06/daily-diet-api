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
			id: data.id ?? randomUUID(),
			name: data.name,
			description: data.description ?? null,
			date_time: data.date_time ? new Date(data.date_time) : new Date(),
			on_diete: data.on_diete,
			created_at: new Date(),
			updated_at: null,
			user_id: data.user_id
		}
		
		this.items.push(snack)
		
		return snack
	}

	async save(snack: Snack) {
		const snackIndex = this.items.findIndex(item => item.id === snack.id)

		snack.updated_at = new Date()

		if ( snackIndex >= 0 ) {
			this.items[snackIndex] = snack
		}

		return snack
	}

	async delete(id: string) {
		const snack = this.items.splice(parseInt(id))

		return snack[0]
	}
}