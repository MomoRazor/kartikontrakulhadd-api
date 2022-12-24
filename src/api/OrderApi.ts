import { Application } from 'express'
import { IOrderSvc } from '../svc'

export const OrderApi = (
	app: Application,
	orderService: IOrderSvc,
	prefix: string
) => {
	app.post(`${prefix}/get/total/box`, async (req, res) => {
		try {
			const { id } = req.body

			if (!id) {
				return res.status(400).json({
					data: null,
					errors: ['Missing Id!'],
				})
			}

			const total = await orderService.getNumberOfBoxesSold()

			return res.status(200).json({
				data: mail,
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

	app.post(`${prefix}/get/mails/table`, async (req, res) => {
		try {
			const body = req.body

			const mailTable = await mailService.getTable(body)

			return res.status(200).json({
				data: mailTable,
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
