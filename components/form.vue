<template>
  <div>
    <input type="text" placeholder="タイトル" v-model="title" />
    <input type="text" placeholder="説明" v-model="description" />
    <input type="number" placeholder="値段" v-model="price" />
    <button @click="onSubmit">送信</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { IProductPayload } from '~/interfaces/IProducts';

@Component
export default class Form extends Vue {
  public title: string = '';
  public description: string = '';
  public price: number = 0;

  // フォーム情報
  public formData: IProductPayload = {
    title: '',
    description: '',
    price: 0,
  };

  public onSubmit() {
    this.$set(this.formData, 'title', this.title)
    this.$set(this.formData, 'description', this.description)
    this.$set(this.formData, 'price', this.price)
    this.$emit('send', this.formData);
  }
}
</script>
