<template>
  <div class="progress">
    <ProgressBar
      :progress="downloadedProg"
    />
    <ProgressBar
      v-if="reencodedProg > 0"
      :progress="reencodedProg"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import getStatus from '@/api/getStatus';
import ProgressBar from './ProgressBar.vue';

export default defineComponent({
  emits: ['downloaded'],
  components: {
    ProgressBar,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      downloadedProg: 0,
      reencodedProg: 0,
      progressInterval: undefined as undefined | number,
    };
  },
  mounted() {
    this.progressInterval = setInterval(async () => {
      const result = await getStatus(this.id);
      this.downloadedProg = result.downloadedProg;
      this.reencodedProg = result.reencodedProg;
      if (result.downloaded) {
        this.$emit('downloaded');
        clearInterval(this.progressInterval);
      }
    }, 2 * 1000);
  },
  beforeUnmount() {
    clearInterval(this.progressInterval);
  },
});
</script>

<style lang="scss" scoped>
.progress > * {
  width: 400px;
  height: 25px;
  border: 1px solid black;
  margin: 8px auto;
}
</style>
