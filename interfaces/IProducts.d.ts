/**
 * 商品情報定義
 */
export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  isVisible: boolean;
}

/**
 * 商品取得APIインターフェイス
 */
export interface IProductPayload {
  title: string;
  description: string;
  price: number;
  imageBase64: string;
}
