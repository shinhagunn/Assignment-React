import create from 'zustand';
import ApiClient from '../library/ApiClient';
import { User } from '../types';
import AddToast from '../library/Toast';
import { persist } from 'zustand/middleware';

type IUserStore = {
  email?: string
  Login: (email: string, password: string, error: string) => Promise<unknown>
  Register: (email: string, password: string, error: string) => Promise<unknown>
  Logout: () => void
}

const useUserStore = create(
  persist<IUserStore>(
  (set, get) => ({
    Login: async (email: string, password: string, text: string) => {
      try {
        const { data } = await new ApiClient().post<{
          user: User
          acessToken: string
        }>('/login', {
          email,
          password,
        });
        console.log(data)

        set({
          ...get(),
          email: data.user.email,
        });
        AddToast('Success', 'Đăng nhập thành công!', 'toast');
      } catch (error) {
        console.log(error)
        AddToast('Error', text ? text : error as string, 'toast');
        return;
      }
    },

    Register: async (email: string, password: string, text: string) => {
      try {
        const { data } = await new ApiClient().post<{
          users: User
          acessToken: string
        }>('/register', {
          email,
          password,
        });

        set({
          ...get(),
          email: data.users.email,
        });
        AddToast('Success', 'Đăng ký thành công!', 'toast');
      } catch (error) {
        AddToast('Error', text ? text : error as string, 'toast');
        return;
      }
    },

    Logout: async () => {
      try {
        set({
          ...get(),
          email: '',
        });
        AddToast('Success', 'Đăng xuất thành công!', 'toast');
      } catch (error) {
        AddToast('Error', 'Đăng xuất không thành công!', 'toast');
        return;
      }
    },
  }),
  {
    name: 'user', // unique name
    getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
  }
));

export default useUserStore;