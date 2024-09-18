export class Store {
    // Properties
    name: string;
    branches: string[];
    logo: string;
    // Constructor
    constructor() {
        this.name = "Amazon";
        this.branches = ["USA", "UK", "Egypt", "Saudi Arabia", "China"];
        this.logo = "../../../assets/amazon_icon.svg";
    }
}
