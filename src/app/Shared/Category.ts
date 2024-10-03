import { SubCategory } from "./SubCategories";

export class Category
{
    Category_ID!:number;
    Category_Name!:string;
    Category_Image!:string;
    SubCategories?:SubCategory[]
}