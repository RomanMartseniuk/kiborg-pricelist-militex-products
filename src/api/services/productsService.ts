import { get } from "../api"

export const productsService = {
   getById: async (id: number) => {
      const data = await get(`get/products/?productId=${id}`);
      if (!data) return null;
      const res = await data.json();
      return res;
   },
   getByCategoryId: async (categoryId: number, vendor = "Militex") => {
      const data = await get(`get/products/?categoryId=${categoryId}${vendor ? `&vendorFilter=${vendor}` : ''}`);
      if (!data) return null;
      const res = await data.json();
      return res;
   }
}