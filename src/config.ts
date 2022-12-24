

export const pricePerBox = 39.99;
export const deliveryPrice = 10;
export const fullStock = 150
export const fromEmail = 'kartikontrakulhadd@gmail.com';
export const fromName = 'KartiKontraKuħadd';

export const generatePurchaseUnits = (amount: number, delivery?: boolean) => {
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
