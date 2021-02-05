<template>
  <div>
    <Authentication />
    <Form @send="createItem" />
    <Products @delete="removeItem" @file="uploadImage"/>
    <br />
    <input @focus="onFocus" type="text" placeholder="タイトル" v-model="keyword" />
    <button @click="searchItem()">検索</button>
    <div v-for="(product, index) in products" :key="index">
      <div v-if="product.isVisible">
        {{ product.title }}
        {{ product.description }}
        {{ product.price }}円
      </div>
    </div>
    {{ errorMessage }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import Products from '@/components/products.vue';
import Form from '@/components/form.vue';
import Authentication from '@/components/authentication.vue';
import { IProduct, IProductPayload } from '@/interfaces/IProducts';
import { TokenUtil } from '@/utilities/tokenUtil';

@Component({
  components: {
    Products,
    Form,
    Authentication,
  },
})
export default class IndexPage extends Vue {
  public keyword: string = '';
  public errorMessage: string = '';

  /** 入力欄を操作時、検索結果を削除 */
  public onFocus(): void {
    const matchTitle = this.products.filter(product => product.isVisible == true);
      matchTitle.forEach(product => {
        this.$store.commit('product/changeFlag', product);
      });
  }

  public get products(): IProduct[] {
    return this.$store.getters['product/getProducts'];
  }

  public async getAll() {
    const token = TokenUtil.getToken();
    try {
      await this.$store.dispatch('product/getAll', token);
      console.log('成功');
    } catch (error) {
      console.log(error.response);
    }
  }

  public async createItem(value: IProductPayload) {
    const token = TokenUtil.getToken();
    try {
      // 作成処理
      await this.$store.dispatch('product/createProduct', { token: token, payload: value });
      // 作成したproductを追加し、一覧を更新する
      await this.$store.dispatch('product/getAll', token);
      console.log('成功');
    } catch (error) {
      console.log(error.response);
    }
  }

  public async removeItem(value: number) {
    const token = TokenUtil.getToken();
    try {
      // 商品の削除
      await this.$store.dispatch('product/deleteProduct', { token: token, id: value });
      // 全商品を再取得（商品一覧の更新）
      await this.$store.dispatch('product/getAll', token);
    } catch (error) {
      console.log(error.response);
    }
  }

  public async uploadImage(value: any) {
    const token = TokenUtil.getToken();
    try {
      // 画像のアップロード
      await this.$store.dispatch('product/imageUpload', {
        token: token,
        id: value.id,
        payload: value.image,
      });
    } catch (error) {
      console.log(error.response);
    }
  }

  public searchItem() {
    const matchTitle = this.products.filter(product => product.title.includes(this.keyword));
    if (!matchTitle.length) {
      this.errorMessage = '検索結果がありませんでした';
      this.keyword = '';
    } else {
      matchTitle.forEach(product => {
        console.log(product.isVisible)
        this.$store.commit('product/changeFlag', product);
      });
      this.errorMessage = '';
      this.keyword = '';
    }
  }

  /**
   * ライフサイクル
   * localStrageを参照するためmountedで取得
   */
  mounted() {
    this.getAll();
  }
}
</script>

