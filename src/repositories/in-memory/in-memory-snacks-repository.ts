import { Snack, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'
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

	async countSnacksOnDietByUserId(userId: string): Promise<number> {
		return this.items.filter(item => 
			item.user_id === userId && item.on_diete).length
	}

	async countSnacksOffDietByUserId(userId: string): Promise<number> {
		return this.items.filter(item => 
			item.user_id === userId && !item.on_diete).length
	}

	async findBestSnackSequencePerDayWithinDiet(userId: string): Promise<number> {
		const snacksOnDiet = this.items.filter(item => 
			item.user_id === userId && item.on_diete)

		snacksOnDiet.sort((a, b) => a.date_time.getTime() - b.date_time.getTime())

		let sequence = 0
		let bestSequence = 0
		let lastDate = new Date()

		for(let i = 0; i < snacksOnDiet.length; i++) {
			if (i === 0) {
				sequence = 1
				lastDate = snacksOnDiet[i].date_time
				continue
			}

			const diferenceInDaysBetweenCurrentAndLastDate =
				dayjs(snacksOnDiet[i].date_time).diff(
					lastDate, 
					'day'
				)

			if ( diferenceInDaysBetweenCurrentAndLastDate === 0 ) 
			{
				lastDate = snacksOnDiet[i].date_time
				continue
			}

			if (diferenceInDaysBetweenCurrentAndLastDate === 1 ) {
				sequence += 1
			}
			else if (sequence > bestSequence) {
				bestSequence = sequence
				sequence = 0
			} else {
				sequence = 0
			}

			lastDate = snacksOnDiet[i].date_time
		}
		
		return bestSequence
	}

	async countByUserId(userId: string): Promise<number> {
		return this.items.filter(item => item.user_id === userId).length
	}
	
	async create(data: Prisma.SnackUncheckedCreateInput) {
		const snack = {
			id: data.id ?? randomUUID(),
			name: data.name,
			description: data.description ?? null,
			date_time: data.date_time ? new Date(data.date_time) : new Date(),
			on_diete: data.on_diete,
			created_at: new Date(),
			updated_at: data.updated_at ? new Date(data.updated_at) : new Date(),
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