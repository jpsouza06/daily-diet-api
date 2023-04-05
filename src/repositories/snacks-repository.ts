import { Prisma, Snack } from '@prisma/client'

export interface SnacksRepository {
   findById(id: string): Promise<Snack | null>
   searchMany(query: string, page: number): Promise<Snack[] | null>
   create(data: Prisma.SnackCreateInput): Promise<Snack>
}