import { API_ENDPOINT } from '@/constants/api';
import { IProduct } from '@/interfaces/IProducts';
import axios from 'axios';

export interface IState {
  // 全商品
  products: IProduct[] | null;
  // 商品一件
  product: IProduct | null;
}

/**
 * state
 */
export const state = (): IState => ({
  // 全商品
  products: [],
  // 商品一件
  product: {
    id: 0,
    title: '',
    description: '',
    price: 0,
    image: '',
  },
});

/**
 * getters
 */
export const getters = {
  // 全商品取得
  getProducts(state: IState): IProduct[] | null {
    return state.products;
  },
  // 商品一件取得
  getProduct(state: IState): IProduct | null {
    return state.product;
  },
};

/**
 * mutations
 */
export const mutations = {
  // 全商品を保存
  saveProducts(state: IState, products: IProduct[]): void {
    state.products = products;
  },
  // 商品一件を保存
  saveProduct(state: IState, product: IProduct): void {
    state.product = product;
  },
};

/**
 * actions
 */
export const actions = {
  /**
   * 商品情報一覧を取得
   */
  async getAll({ commit }: any, token: string) {
    try {
      const products = await axios.get(API_ENDPOINT.JAVA_APP_HOST, {
        headers: {
          Authorization: `Bearer:${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(products.data)
      commit('saveProducts', products.data);
    } catch (error) {
      throw error;
    }
  },

  async createProduct({}: any, { token, payload }: any) {
    try {
      await axios.post(API_ENDPOINT.JAVA_APP_HOST, payload, {
        headers: {
          Authorization: `Bearer:${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      throw error;
    }
  },
};
