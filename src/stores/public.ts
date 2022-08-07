import create from 'zustand';
import {
  Product, Category
} from '../types/';
import ApiClient from '../library/ApiClient';

type PublicStore = {
  products: Product[]
  product: Product
  categories: Category[]
  comments?: Comment[]

  fetchProducts: (query: string) => Promise<unknown>
  fetchProduct: (id: string | undefined) => Promise<unknown>
  fetchCategories: () => Promise<unknown>
}

const usePublicStore = create<PublicStore>((set, get) => ({
  slides: [],
  products: [],
  product: {} as Product,
  categories: [],

  fetchProducts: async (query: string) => {
    try {
      const { data: products } = await new ApiClient().get<Product[]>(`/products?${query}`);

      set({
        ...get(),
        products,
      });
    } catch (error) {
      return error;
    }
  },

  fetchProduct: async (id: string | undefined) => {
    try {
      const { data: product } = await new ApiClient().get<Product>(`/products/${id}`);

      set({
        ...get(),
        product,
      });
    } catch (error) {
      return error;
    }
  },

  fetchCategories: async () => {
    try {
      const { data: categories } = await new ApiClient().get<Category[]>('/categories');

      set({
        ...get(),
        categories,
      });
    } catch (error) {
      return error;
    }
  },
}));

export default usePublicStore;
