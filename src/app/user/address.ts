export class Address 
{
    addressId:number = 0;
    streetAddress:string;
    city:string;
    state:string;
    zipCode:string;

    constructor(streetAddress:string, city:string, state:string, zipCode:string)
    {
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }

    setAddressId(addressId:number)
    {
        this.addressId = addressId;
    }
}