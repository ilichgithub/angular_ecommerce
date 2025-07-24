export interface ICart {
    cartId: number;
    total: number;
    items: IProductCart[];
}

export interface IProductCart {
    cartItemId: number;
    productId: number;
    productName: string;
    productPrice: number;
    quantity: number;
    subtotal: number;
}

export interface IOrderResponse {
    orderId:        number;
    userId:         number;
    orderDate:      string;
    totalAmount:    number;
    status:         string;
    items:          IOrderItemResponse[];
    viewInfo:       boolean;
}

export interface IOrderItemResponse {
    orderItemId:        number;
    productId:          number;
    productName:        string;
    priceAtPurchase:    number;
    quantity:           number;
    subtotal:           number;
}



/* INICIALIZADOS **/ 

export const INITIAL_IPRODUCTCART : IProductCart = {
    cartItemId: 0,
    productId: 0,
    productName: '',
    productPrice: 0,
    quantity: 0,
    subtotal: 0,
}

export const INITIAL_IORDERRESPONSE : IOrderResponse = {
    orderId: 0,
    userId: 0,
    orderDate: '',
    totalAmount: 0,
    status: '',
    items: [],
    viewInfo: false
}