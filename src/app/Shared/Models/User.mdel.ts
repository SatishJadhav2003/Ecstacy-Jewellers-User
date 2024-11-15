export class User {
    User_ID: number = 0;
    First_Name: string = '';
    Last_Name: string = '';
    Email: string = '';
    Email_Verified: boolean = false;
    Phone_Number: string = '';
    Phone_Verified: boolean = false;
    Password_Hash: string = '';
    Password_Salt: string = '';
    Date_Created: Date = new Date();
    Last_Login?: Date;
    Is_Active: boolean = false;
    Gender:string=''
  }
  