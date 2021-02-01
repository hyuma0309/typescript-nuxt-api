<template>
<ul>
      <li v-for="(product, index) in products" :key="index">
        <span>{{ product.title }}</span>
        <span>{{ product.description }}</span>
        <span>{{ product.price }}</span>
        <button @click="remove(product)">削除</button>
        <button @click="edit(index)">編集</button>
        <p>
          <input type="text" name="editForm" v-model="editForm" />
        </p>
      </li>
    </ul>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { IProduct, IProductPayload } from '~/interfaces/IProducts';

@Component
export default class Products extends Vue {

  get products(): IProduct[] {
    return this.$store.getters['product/getProducts'];
  }
}
</script>
