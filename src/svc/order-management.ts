import { deliveryPrice, fromEmail, fromName, pricePerBox } from "../config";
import { ADMIN_EMAILS } from "../env";
import { IOrderRepo, Order } from "../repositories"
import { ICommunicationSvc } from "./communication";
import {DateTime} from 'luxon'


export interface IOrderSvc {
	getNumberOfBoxesSold: () => Promise<number>
	addOrder: (order: Order) => Promise<Order>
    generatePurchaseUnits: (amount: number, delivery?: boolean) => any[]
}

export const OrderSvc = (orderRepo: IOrderRepo, communicationSvc: ICommunicationSvc): IOrderSvc => {
    const getNumberOfBoxesSold = async () => {
        const orderList = await orderRepo.find({})
    
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

        try{
            await communicationSvc.sendEmail({
                from: `${fromName} <${fromEmail}>`,
                html: `<p>Hi! </p>
                <p>A new order has just been submitted on KartiKontraKulħadd.com! Here are the details:</p>
                <ul>
                    <li>Name: ${order.name}</li>
                    <li>Surname: ${order.surname}</li>
                    <li>Email: ${order.email}</li>
                    <li>Mobile Number: ${order.mobileNumber}</li>
                    <li>Amount: ${order.amount}</li>
                    <li>${order.delivery ? 'To Be Delivered' : 'For Pickup'}</li>
                    ${
                        order.delivery
                            ? '<li>Full Address: ' +
                              order.addressLine1 +
                              ' ' +
                              order.addressLine2 +
                              ' ' +
                              order.postCode +
                              ' ' +
                              order.locality +
                              '</li>' +
                              '<li>Special Request: ' +
                              order.deliveryNote +
                              '</li>'
                            : ''
                    }
                    <li>Price: €${order.price.toFixed(2)}</li>
                </ul>
                <p>Soo... yeah, get to it!</p>`,
                status: 'Pending',
                subject: `KKK Order ${DateTime.now().toFormat('YYYY-MM-DD HH:mm')}`,
                to: ADMIN_EMAILS
            })
        }catch(e){
            console.info('Admin Email could not be sent')
        }

        try{
            await communicationSvc.sendEmail({
                from: `${fromName} <${fromEmail}>`,
                html: `<p>Hi ${order.name} ${
                    order.surname
                }! </p>
        <p>We'd like to confirm that we have received your order on KartiKontraKulħadd.com! Here are the details:</p>
        <ul>
            <li>Name: ${order.name}</li>
            <li>Surname: ${order.surname}</li>
            <li>Email: ${order.email}</li>
            <li>Mobile Number: ${order.mobileNumber}</li>
            <li>Amount: ${order.amount}</li>
            <li>${order.delivery ? 'To Be Delivered' : 'For Pickup'}</li>
            ${
                order.delivery
                    ? '<li>Full Address: ' +
                      order.addressLine1 +
                      ' ' +
                      order.addressLine2 +
                      ' ' +
                      order.postCode +
                      ' ' +
                      order.locality +
                      '</li>' +
                      '<li>Special Request: ' +
                      order.deliveryNote +
                      '</li>'
                    : ''
            }
            <li>Price: €${order.price.toFixed(2)}</li>
        </ul>`,
                status: 'Pending',
                subject: `KKK Order ${DateTime.now().toFormat('YYYY-MM-DD HH:mm')}`,
                to: ADMIN_EMAILS
            })
        }catch(e){
            console.info('Client Email could not be sent')
        }

        return order
    }

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
	}
}
