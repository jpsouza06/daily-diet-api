import { Snack } from '@prisma/client'

import dayjs from 'dayjs'

export function getBestSnackSequencePerDayWithinDiet(snacksOnDiet: Snack[]) {
	snacksOnDiet.sort((a, b) => a.date_time.getTime() - b.date_time.getTime())

	let sequence = 0
	let bestSequence = 0
	let lastDate = new Date()

	for(let i = 0; i < snacksOnDiet.length; i++) {
		
		if (i === 0) {
			sequence = 1
			bestSequence = 1
			lastDate = snacksOnDiet[i].date_time
			continue
		}
		console.log(snacksOnDiet[i].date_time)
		const diferenceInDaysBetweenCurrentAndLastDate =
         dayjs(snacksOnDiet[i].date_time).diff(lastDate, 'day')

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