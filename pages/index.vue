<template>
  <div>
    <Form @send="createItem" />
    <Products />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types';
import Products from '@/components/products.vue';
import Form from '@/components/form.vue';
import { IProduct, IProductPayload } from '~/interfaces/IProducts';
import { TokenUtil } from '@/utilities/tokenUtil';

@Component({
  components: {
    Products,
    Form,
  },
})
export default class IndexPage extends Vue {
  public async getAll() {
    const token = TokenUtil.getToken();
    try {
      await this.$store.dispatch('product/getAll', token);
      console.log('成功');
    } catch (error) {
      console.log('エラー出ました');
    }
  }

  public async createItem(value: IProductPayload) {
    const token = TokenUtil.getToken();
    try {
      await this.$store.dispatch('product/createProduct', { token: token, payload: value });
      console.log('成功');
    } catch (error) {
      console.log('エラー出ました');
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

