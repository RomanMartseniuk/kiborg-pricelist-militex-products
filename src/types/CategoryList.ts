import type { Product } from "./Product";

export type CategoryList = {
   id: number;
   name: string;
   products: Product[];
}