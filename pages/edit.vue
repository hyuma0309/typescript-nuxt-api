<template>
  <div>
    <h1>商品編集</h1>
    <span>{{ product.title }}</span>
    <span>{{ product.description }}</span>
    <span>{{ product.price }}円</span>
    <img
      v-if="product.imagePath"
      :src="`http://localhost:8080/api/products/${product.id}/images/${product.imagePath}`"
      style="width: 5%; height: 56.25%"
    />
    <img v-else src="../assets/noImage.png" style="width: 5%; height: 56.25%" />
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
export default class Edit extends Vue {
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
  public mounted() {
    const token = localStorage.getItem('token')!.toString();
    try {
      this.$store.dispatch('product/getProduct', { token: token, id: this.$route.query.id });
    } catch (error) {
      console.log(error.response);
    }
  }
}
</script>
