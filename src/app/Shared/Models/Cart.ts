export class Cart {
  Cart_ID: number;
  Product_ID: number;
  User_ID: number;
  Quantity: number;
}

export class CartOutput {
  Cart_ID: number;
  Product_ID: number;
  User_ID: number;
  Quantity: number;
  Price: number;
  Product_Name: string;
  Description: string;
  Product_Image:string;
}
