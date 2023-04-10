import { Prisma, Snack } from '@prisma/client'

export interface SnacksRepository {
   findById(id: string): Promise<Snack | null>
   findManyByUserId(userId: string, page: number): Promise<Snack[] | null>
   create(data: Prisma.SnackUncheckedCreateInput): Promise<Snack>
   save(snack: Snack): Promise<Snack>
   delete(id: string): Promise<Snack> 
}