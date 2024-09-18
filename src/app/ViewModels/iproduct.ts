import { ICategory } from "./icategory";

export interface IProduct {
    id: number,
    name: string,
    quantity: number,
    price: number,
    amount: number | 1,
    img: string,
    categoryID: number,
}

