export class Product {
  Product_ID!: number;
  Product_Name?: string;
  Description?: string;
  Category_ID?: number;
  Price?: number;
  Stock_Quantity?: number;
  Quantity?: number;
  Rating?:number;
  Total_Ratings?:number;
  Total_Reviews?:number;
  Weight?: number;
  Product_Image?: string;
  Is_Active?: boolean;
  Date_Added?: Date;
  Updated_Date?: Date;

  // Dimesion 
  Dimension_ID?: number;
  Title?:string;
  Dim_Desc?:string;

}
