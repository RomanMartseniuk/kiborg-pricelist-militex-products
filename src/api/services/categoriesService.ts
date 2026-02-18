import { get } from "../api"

export const categoriesService = {
   get: async () => {
      const data = await get('get/categories/?vendorFilter=Militex');
      if (!data) return []
      const res = await data.json();
      return res;
   }
}