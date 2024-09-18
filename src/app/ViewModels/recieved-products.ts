import { IProduct } from "./iproduct";

export class RecievedProducts implements IProduct {
    // Properties
    public itemCount: number;
    // Constructor
    constructor(
        public id: number,
        public name: string,
        public quantity: number,
        public price: number,
        public amount: number,
        public img: string,
        public categoryID: number,
    ) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
        this.amount = amount;
        this.img = img;
        this.categoryID = categoryID;
        this.itemCount = 1;
    }

}
