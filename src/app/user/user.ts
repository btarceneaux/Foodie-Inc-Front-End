import { Address } from "./address";

export class User
{
    userId:number = 0;
    firstName:string;
    lastName:string;
    emailAddress:string;
    password:string;
    myAddress: Address;

    constructor(firstName:string, lastName:string, emailAddress:string, password:string, address:Address)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.password = password;
        this.myAddress = address;
    }

    setUserId(userId:number)
    {
        this.userId = userId;
    }

    setAddress(address:Address)
    {
        this.myAddress = address;
    }
}