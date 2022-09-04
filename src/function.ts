import { MongoClient } from 'mongodb';
import { ENVIRONMENT } from './enviornment';
import { connectToCollection } from './mongo';
import { OrderData } from './types';

export const dbName = 'store';

export const orderCollection =
    ENVIRONMENT === 'production' ? 'kartikontrakulhaddorders' : 'kartikontrakulhaddorders-staging';

export const getNumberOfBoxesSold = async (client: MongoClient) => {
    const orders = await connectToCollection(client, dbName, orderCollection);

    const orderList = orders.find();

    let numberOfBoxes = 0;

    await orderList.forEach((order) => {
        if (order) {
            numberOfBoxes += order.amount;
        }
    });

    return numberOfBoxes;
};

export const addOrder = async (client: MongoClient, orderData: OrderData, totalPrice: number) => {
    const orders = await connectToCollection(client, dbName, orderCollection);

    return await orders.insertOne({
        name: orderData.name,
        surname: orderData.surname,
        email: orderData.email,
        mobileNumber: orderData.mobileNumber,
        amount: orderData.amount,
        delivery: orderData.delivery,
        addressLine1: orderData.addressLine1,
        addressLine2: orderData.addressLine2,
        locality: orderData.locality,
        postCode: orderData.postCode,
        deliveryNote: orderData.deliveryNote,
        price: totalPrice
    });
};
