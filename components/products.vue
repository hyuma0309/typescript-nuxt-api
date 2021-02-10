<template>
  <ul>
    <li v-for="(product, index) in products" :key="index">
      <span>{{ product.title }}</span>
      <span>{{ product.description }}</span>
      <span>{{ product.price }}円</span>
      <div>
        <img
          v-if="product.imagePath"
          :src="`${localhost}/${product.id}/images/${product.imagePath}`"
          style="width: 5%; height: 56.25%"
        />
        <img v-else src="../assets/noImage.png" style="width: 5%; height: 56.25%" />
        <input type="file" @change="setImage($event,product.id)" />
        <button @click="remove(product.id)">削除</button>
        <nuxt-link :to="`/edit?id=${product.id}`">編集</nuxt-link>
      </div>
    </li>
  </ul>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { IProduct } from '@/interfaces/IProducts';
import { API_ENDPOINT } from '@/constants/api';

@Component
export default class Products extends Vue {
  public localhost: string = API_ENDPOINT.JAVA_APP_HOST;

  public get products(): IProduct[] {
    return this.$store.getters['product/getProducts'];
  }

  public remove(id: number) {
    this.$emit('delete', id);
  }

  public setImage(e: any, id: number) {
    // ファイルの取得
    const file = e.target.files[0];
    const data = new FormData();

    data.append('productImage', file);
    this.$emit('file', { id: id, image: data });
  }
}
</script>
