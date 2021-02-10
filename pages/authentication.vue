<template>
  <div>
    <input type="text" placeholder="トークン" v-model="token" />
    <button @click="tokenSend">認証</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import { TokenUtil } from '@/utilities/tokenUtil';

@Component
export default class Authentication extends Vue {
  public token: string = '';

  public async tokenSend() {
    TokenUtil.setToken(this.token);
    const token = TokenUtil.getToken();
    try {
      await this.$store.dispatch('product/getAll', token);
      this.$router.push('/');
    } catch (error) {
      console.log(error.response);
    }
  }
}
</script>
