<template>
  <div>
    <Authentication />
    <Form @send="createItem" />
    <Products @delete="removeItem"/>
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
    Authentication
  },
})
export default class IndexPage extends Vue {
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

  /**
   * ライフサイクル
   * localStrageを参照するためmountedで取得
   */
  mounted() {
    this.getAll();
  }
}
</script>

