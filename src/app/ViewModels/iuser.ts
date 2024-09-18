export interface IUser {
    id: number,
    fullName: string,
    email: string,
    phoneNumber: string[],
    address: {
        city: string,
        street: string,
        postalCode: string,
    },
    password: string,
    deliveryOptions: string,
    selectedDay: Date | null,
}
