import { Order } from '../repositories';

export const generateClientEmail = (order: Order) => {
    return `<p>Hi ${order.name} ${order.surname}! </p>
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
</ul>`;
};
