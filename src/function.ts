import { NODE_ENV } from './enviornment';
import { connectToCollection, mongoClient, connectToCluster } from './mongo';
import { OrderData } from './types';

export const dbName = 'store';

export const orderCollection =
    NODE_ENV === 'production' ? 'kartikontrakulhaddorders' : 'kartikontrakulhaddorders-staging';

export const getNumberOfBoxesSold = async () => {
    const client = await connectToCluster(mongoClient);

    const orders = await connectToCollection(client, dbName, orderCollection);

    const orderList = orders.find();

    let numberOfBoxes = 0;

    orderList.forEach((order) => {
        if (order) {
            numberOfBoxes += order.amount;
        }
    });

    return numberOfBoxes;
};

export const addOrder = async (orderData: OrderData, totalPrice: number) => {
    const client = await connectToCluster(mongoClient);
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
        localityCode: orderData.localityCode,
        deliveryNote: orderData.deliveryNote,
        price: totalPrice
    });
};
