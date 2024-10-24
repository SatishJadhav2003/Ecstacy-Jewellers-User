export class Address {
    Address_ID!: number;
    User_ID!: number;
    Mobile!: number;
    Name: string = '';
    Address_Type: string = '';
    Address_Line1: string = '';
    Address_Line2: string = '';
    City: string = '';
    State: string = '';
    Country: string = '';
    Postal_Code!: number;
    Is_Default!: boolean;
    Date_Added!: Date;
  }
  