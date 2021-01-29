<template lang="pug">
.content
  EntryInput
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { Context } from '@nuxt/types';
import EntryInput from '../components/index.vue';

@Component({
  components: {
    EntryInput,
  },
})
export default class IndexPage extends Vue {

}
</script>

