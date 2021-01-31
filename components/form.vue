<template>
  <div>
    <input type="text" placeholder="トークン" v-model="token" />
    <button @click="tokenSend">認証</button>
    <br />
    <input type="text" placeholder="タイトル" v-model="title" />
    <input type="text" placeholder="説明" v-model="description" />
    <input type="text" placeholder="値段" v-model="price" />
    <button @click="onSubmit">送信</button>

    <!-- <ul>
      <li v-for="(formData, index) in this.formData" :key="index">
        <span>{{ formData.title }}</span>
        <span>{{ formData.description }}</span>
        <span>{{ formData.price }}</span>
        <button @click="remove(todo)">削除</button>
        <button @click="edit(index)">編集</button>
        <p>
          <input type="text" name="editForm" v-model="editForm" />
        </p>
      </li>
    </ul>-->
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'nuxt-property-decorator';
import { IProduct, IProductPayload } from '~/interfaces/IProducts';
import { TokenUtil } from '@/utilities/tokenUtil';

@Component
export default class Form extends Vue {
  public token!: string;
  public title!: string;
  public description!: string;
  public price!: number;

  // フォーム情報
  public formData: IProductPayload = {
    title: '',
    description: '',
    price: 0,
    imageBase64: '',
  };

  public onSubmit() {
    this.formData.title = this.title;
    this.formData.description = this.description;
    this.formData.price = this.price;
    console.log(this.formData);
    this.$emit('send', this.formData);
  }

  public tokenSend() {
    TokenUtil.setToken(this.token);
  }
}
</script>
