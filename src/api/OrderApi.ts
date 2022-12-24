import { Application } from 'express'
import { IOrderSvc } from '../svc'

export const OrderApi = (
	app: Application,
	orderService: IOrderSvc,
	prefix: string
) => {
	app.post(`${prefix}/get/total/box`, async (_, res) => {
		try {
			const total = await orderService.getNumberOfBoxesSold()

			return res.status(200).json({
				data: total,
				errors: [],
			})
		} catch (e: any) {
			console.error(e)
			return res.status(500).json({
				data: null,
				errors: [e.message],
			})
		}
	})
}
