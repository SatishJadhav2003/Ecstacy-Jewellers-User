export class OrderInputOutput {
    Order_ID: number;
    Address_ID: number;
    User_ID: number;
    Order_Date: Date;
    Status: string;
    Total_Amount: number;
    Shipping_Address: string;
    Billing_Address: string;
    Payment_Status: string;
    Product_Name: string;
    Product_Image: string;
    Description: string;
    Order_Item_ID: number;
    Product_ID: number;
    Quantity: number;
    Unit_Price: number;
    Total_Price: number;
    Status_TimeStamp: Date;

    // New fields based on updated query
    City_Name: string;           // City from Addresses table
    Is_Delivered: boolean;       // Flag indicating if the order was delivered
    Delivery_Date?: Date;        // Delivery date (optional if not delivered)
    Order_Placed_Date?: Date;    // Date when the order was placed
}


export class Order_Description {
    Order_ID:number;
    Product_Image: string;
    Status: string;
    Status_Timestamp: Date;
    Location: string;
    Product_Name: string;
    Description: string;
    Total_Amount: number;
    Unit_Price: number;
    Quantity: number;
}
