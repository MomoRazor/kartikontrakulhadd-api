import { deliveryPrice, fromEmail, fromName, pricePerBox } from '../config';
import { ADMIN_EMAILS } from '../env';
import { IOrderRepo, Order } from '../repositories';
import { generateClientEmail } from '../templates';
import { generateAdminEmail } from '../templates/admin-email';
import { ICommunicationSvc } from './communication';
import { DateTime } from 'luxon';

export interface IOrderSvc {
    getNumberOfBoxesSold: () => Promise<number>;
    addOrder: (order: Order) => Promise<Order>;
    generatePurchaseUnits: (amount: number, delivery?: boolean) => any[];
}

export const OrderSvc = (orderRepo: IOrderRepo, communicationSvc: ICommunicationSvc): IOrderSvc => {
    const getNumberOfBoxesSold = async () => {
        const orderList = await orderRepo.find({});

        let numberOfBoxes = 0;

        await orderList.forEach((order) => {
            if (order) {
                numberOfBoxes += order.amount;
            }
        });

        return numberOfBoxes;
    };

    const addOrder = async (orderData: Order) => {
        const order = await orderRepo.create(orderData);

        try {
            await communicationSvc.sendEmail({
                from: `${fromName} <${fromEmail}>`,
                html: generateAdminEmail(order),
                status: 'Pending',
                subject: `KKK Order ${DateTime.now().toFormat('yyyy/MM/dd hh:mm')}`,
                to: ADMIN_EMAILS
            });
        } catch (e) {
            console.info('Admin Email could not be sent');
        }

        try {
            await communicationSvc.sendEmail({
                from: `${fromName} <${fromEmail}>`,
                html: generateClientEmail(order),
                status: 'Pending',
                subject: `KKK Order ${DateTime.now().toFormat('yyyy/MM/dd hh:mm')}`,
                to: [order.email]
            });
        } catch (e) {
            console.info('Client Email could not be sent');
        }

        return order;
    };

    const generatePurchaseUnits = (amount: number, delivery?: boolean) => {
        let purchaseUnits: any[] = [];
        for (let i = 0; i < amount; i++) {
            purchaseUnits.push({
                reference_id: 'KKKBOX-' + i,
                description: 'A Box of Karti Kontra Kulħadd',
                amount: {
                    currency_code: 'EUR',
                    value: pricePerBox.toFixed(2)
                }
            });
        }

        if (delivery) {
            purchaseUnits.push({
                reference_id: 'delivery',
                description: 'Delivery Service',
                amount: {
                    currency_code: 'EUR',
                    value: deliveryPrice.toFixed(2)
                }
            });
        }

        return purchaseUnits;
    };

    return {
        getNumberOfBoxesSold,
        addOrder,
        generatePurchaseUnits
    };
};
