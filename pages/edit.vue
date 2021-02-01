<template>
  <div>
    <h1>商品編集</h1>
    <span>{{ product.title }}</span>
    <span>{{ product.description }}</span>
    <span>{{ product.price }}円</span>
    <Form @send="editItem" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import Form from '@/components/form.vue';
import { IProduct, IProductPayload } from '@/interfaces/IProducts';
import { TokenUtil } from '@/utilities/tokenUtil';

@Component({
  components: {
    Form,
  },
})
export default class edit extends Vue {
  public get product(): IProduct {
    return this.$store.getters['product/getProduct'];
  }

  public async editItem(value: IProductPayload) {
    const token = TokenUtil.getToken();
    try {
      // 商品の編集
      await this.$store.dispatch('product/editProduct', {
        token: token,
        id: this.$route.query.id,
        payload: value,
      });
      // 編集に成功したら商品一覧ページへ遷移
      this.$router.push('/');
    } catch (error) {
      console.log(error.response);
    }
  }

  /**
   * ライフサイクル
   */
  mounted() {
    const token = localStorage.getItem('token')!.toString();
    this.$store.dispatch('product/getProduct', { token: token, id: this.$route.query.id });
  }
}
</script>
