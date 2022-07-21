import create from 'zustand';
import {
  Product, Category
} from '../types/';
import ApiClient from '../library/ApiClient';

type AdminStore = {
  products: Product[]
  product?: Product
  category?: Category
  categories: Category[]

  fetchProducts: (query: string) => Promise<unknown>
  fetchProduct: (id: string | undefined) => Promise<Product>
  fetchCategories: () => void
  createProduct: (product: Product) => void
  createCategory: (category: Category) => void
  updateProduct: (product: Product) => void
  deleteProduct: (id: string | undefined) => void
  deleteCategory: (id: string | undefined) => void
}

const useAdminStore = create<AdminStore>((set, get) => ({
  products: [],
  categories: [],

  fetchProducts: async (query: string) => {
    try {
      let { data: products } = await new ApiClient().get<Product[]>(`/products?${query}`);

      products = products.map(p => ({
        ...p,
        key: p.id,
      }))

      set({
        ...get(),
        products,
      });
    } catch (error) {
      return error;
    }
  },

  fetchProduct: async (id: string | undefined): Promise<Product> => {
    try {
      const { data: product } = await new ApiClient().get<Product>(`/products/${id}?_expand=category`);

      set({
        ...get(),
        product,
      });
      return product
    } catch (error) {
      const product: Product = {}
      return product
    }
  },

  fetchCategories: async () => {
    try {
      let { data: categories } = await new ApiClient().get<Category[]>('/categories');

      set({
        ...get(),
        categories,
      });

      return categories;
    } catch (error) {
      return error;
    }
  },

  createProduct: async (product: Product) => {
    try {
      const { data: createdProduct } = await new ApiClient().post<Product>('/products', product);

      set({
        ...get(),
        product: createdProduct,
      });
    } catch (error) {
      return error;
    }
  },

  createCategory: async (category: Category) => {
    try {
      const { data: createdCategory } = await new ApiClient().post<Category>('/categories', category);

      set({
        ...get(),
        category: createdCategory,
      });
    } catch (error) {
      return error;
    }
  },

  updateProduct: async (product: Product) => {
    try {
      const { data: updatedProduct } = await new ApiClient().put<Product>(`/products/${product.id}`, product);

      set({
        ...get(),
        product: updatedProduct,
      });
    } catch (error) {
      return error;
    }
  },

  deleteProduct: async (id: string | undefined) => {
    try {
      await new ApiClient().delete(`/products/${id}`);
      const state = get();
      const index = state.products.findIndex((c) => c.id === Number(id));

      if (index >= 0) {
        state.products.splice(index, 1);
      }

      set({
        products: state.products,
      });
    } catch (error) {
      return error;
    }
  },

  deleteCategory: async (id: string | undefined) => {
    try {
      await new ApiClient().delete(`/categories/${id}`);
      const state = get();
      const index = state.categories.findIndex((c) => c.id === Number(id));

      if (index >= 0) {
        state.categories.splice(index, 1);
      }

      set({
        categories: state.categories,
      });
    } catch (error) {
      return error;
    }
  }
}));

export default useAdminStore;
