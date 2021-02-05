import { API_ENDPOINT } from '@/constants/api';
import { IProduct } from '@/interfaces/IProducts';
import axios from 'axios';

export interface IState {
  // 全商品
  products: IProduct[] | null;
  // 商品一件
  product: IProduct;
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
    isVisible: false,
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

  // 検索flag
  changeFlag(state: IState, product: IProduct): void {
    product.isVisible = !product.isVisible;
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
      products.data.forEach((product: any) => {
        product.isVisible = false;
      });
      commit('saveProducts', products.data);
    } catch (error) {
      throw error;
    }
  },

  // 一件取得処理
  async getProduct({ commit }: any, { token, id }: any) {
    try {
      const response = await axios.get(`${API_ENDPOINT.JAVA_APP_HOST}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      commit('saveProduct', response.data);
    } catch (error) {
      throw error;
    }
  },

  //作成処理
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

  // 画像アップロード
  async imageUpload({}: any, { token, id, payload }: any) {
    console.log(`${API_ENDPOINT.JAVA_APP_HOST}/${id}/images`)
    try {
      await axios.patch(`${API_ENDPOINT.JAVA_APP_HOST}/${id}/images`, payload, {
        headers: {
          Authorization: `Bearer:${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      throw error;
    }
  },

  // 編集処理
  async editProduct({}: any, { token, id, payload }: any) {
    console.log(payload);
    try {
      await axios.put(`${API_ENDPOINT.JAVA_APP_HOST}/${id}`, payload, {
        headers: {
          Authorization: `Bearer:${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      throw error;
    }
  },

  //削除処理
  async deleteProduct({}: any, { token, id }: any) {
    try {
      await axios.delete(`${API_ENDPOINT.JAVA_APP_HOST}/${id}`, {
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
