import { Router } from 'express';
import { IOrderSvc } from '../svc';
import { sendExpressError } from '@sector-eleven-ltd/cosmos-lite';
import { deliveryPrice, pricePerBox } from '../config';
import { STOCK_SIZE } from '../env';

export const OrderRouter = (orderSvc: IOrderSvc) => {
    const router = Router();

    router.post(`/get/boxs/total`, async (_, res) => {
        try {
            const total = await orderSvc.getNumberOfBoxesSold();

            res.status(200).json({
                data: total,
                errors: []
            });
        } catch (e: any) {
            sendExpressError(res, e);
        }
    });

    router.post('/create/orders', async (req, res) => {
        const { data } = req.body;
        const price = pricePerBox * data.amount + (data.delivery ? deliveryPrice : 0);
        try {
            const order = await orderSvc.addOrder({
                ...data,
                price
            });
            res.status(200).json({
                data: order
            });
        } catch (e) {
            console.error(e);
            res.status(500).send(e);
        }
    });

    router.post('/generate/purchase-units', async (req, res) => {
        if (req.body.amount) {
            let purchaseUnits: any[] = orderSvc.generatePurchaseUnits(
                req.body.amount,
                req.body.delivery
            );

            res.status(200).json({
                purchaseUnits: purchaseUnits
            });
        } else {
            console.error('Amount Missing');
            res.status(400).send('Amount Missing');
        }
    });

    router.get('/get/delivery-price', async (_, res) => {
        res.status(200).json({
            deliveryPrice: deliveryPrice
        });
    });

    router.get('/get/box-price', async (_, res) => {
        res.status(200).json({
            pricePerBox: pricePerBox
        });
    });

    router.get('/get/stock-number', async (_, res) => {
        try {
            const orderNumber = await orderSvc.getNumberOfBoxesSold();
            const left = parseInt(STOCK_SIZE || '0') - orderNumber;
            res.status(200).json({
                inStock: left
            });
        } catch (e) {
            console.error(e);
            res.status(500).send(e);
        }
    });

    return router;
};
