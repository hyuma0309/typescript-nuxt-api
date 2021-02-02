<template>
  <ul>
    <li v-for="(product, index) in products" :key="index">
      <span>{{ product.title }}</span>
      <span>{{ product.description }}</span>
      <span>{{ product.price }}円</span>
      <button @click="remove(product.id)">削除</button>
      <button @click="edit(product.id)">編集</button>
    </li>
  </ul>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { IProduct } from '@/interfaces/IProducts';

@Component
export default class Products extends Vue {
  public get products(): IProduct[] {
    return this.$store.getters['product/getProducts'];
  }

  public remove(id: number) {
    this.$emit('delete', id);
  }

  public edit(id: string) {
    this.$router.push({ path: 'edit', query: { id } });
  }
}
</script>
