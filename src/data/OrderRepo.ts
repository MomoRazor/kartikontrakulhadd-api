import { Schema, Model, Connection } from 'mongoose';

export interface Order {
    name: string;
    surname: string;
    email: string;
    mobileNumber: string;
    amount: number
    delivery: boolean
    addressLine1: string
    addressLine2: string
    locality: string
    postCode: string
    deliveryNote: string
    price: number
}

export type IOrderRepo = Model<Order>;

const OrderSchema = new Schema<Order>({
    name: { type: Schema.Types.String, required: true },
    surname: { type: Schema.Types.String, required: true },
    email: { type: Schema.Types.String, required: true },
    mobileNumber: { type: Schema.Types.String, required: true },
    amount: { type: Schema.Types.Number, required: true },
    delivery: { type: Schema.Types.Boolean, required: true },
    addressLine1: { type: Schema.Types.String, required: false },
    addressLine2: { type: Schema.Types.String, required: false },
    locality: { type: Schema.Types.String, required: false },
    postCode: { type: Schema.Types.String, required: false },
    deliveryNote: { type: Schema.Types.String, required: false },
    price: { type: Schema.Types.Number, required: true },
});

export const OrderRepo = async (connection: Connection): Promise<IOrderRepo> => {
    const orderRepo = connection.model<Order>('order', OrderSchema);
    await orderRepo.syncIndexes();
    return orderRepo;
};
