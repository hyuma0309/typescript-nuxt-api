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
export default class Form extends Vue {
  public token: string = '';

  public tokenSend() {
    TokenUtil.setToken(this.token);
    location.reload()
  }
}
</script>
