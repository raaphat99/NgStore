export class ShoppingCartItems {
    // Properties
    prdID: number;
    prdName: string;
    selectedQuantity: number;
    unitPrice: number;
    totalPriceForOneItem: number;
    // Constructor
    constructor(id:number, name:string, neededQuantity: number, price:number) {
        this.prdID = id;
        this.prdName = name;
        this.selectedQuantity = neededQuantity
        this.unitPrice = price;
        this.totalPriceForOneItem = this.selectedQuantity * this.unitPrice;
    }
}
