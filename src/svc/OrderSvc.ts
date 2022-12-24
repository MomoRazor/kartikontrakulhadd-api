import { IOrderRepo, Order } from "../data"


export interface IOrderSvc {
	getNumberOfBoxesSold: () => Promise<number>
	addOrder: (order: Order) => Promise<Order>
}

export const OrderSvc = (orderRepo: IOrderRepo): IOrderSvc => {
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

        return await orderRepo.create(orderData);
    }

	return {
        getNumberOfBoxesSold,
        addOrder
	}
}
