export interface ICategory {
  id: number;
  name: string;
  description: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
  categoryDTO: ICategory;
}