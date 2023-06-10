import { Order } from '../repositories';

export const generateAdminEmail = (order: Order) => {
    return `<p>Hi! </p>
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
                <p>Soo... yeah, get to it!</p>`;
};
