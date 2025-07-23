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


/* INICIALIZADOS **/ 

export const INITIAL_IPRODUCTCART : IProductCart = {
    cartItemId: 0,
    productId: 0,
    productName: '',
    productPrice: 0,
    quantity: 0,
    subtotal: 0,
}

