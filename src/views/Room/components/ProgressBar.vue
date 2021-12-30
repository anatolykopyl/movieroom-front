<template>
  <div class="bar">
    <div
      class="fill"
      :style="{
        width: `${progress * 100}%`
      }"
    />
    <div class="digits">
      {{ progressPerc }}%
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import getStatus from '@/api/getStatus';

export default defineComponent({
  emits: ['downloaded'],
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      progress: 0,
      progressInterval: undefined as undefined | number,
    };
  },
  computed: {
    progressPerc() {
      return Math.floor(this.progress * 100);
    },
  },
  mounted() {
    this.progressInterval = setInterval(async () => {
      const result = await getStatus(this.id);
      this.progress = result.progress;
      if (result.downloaded || this.progress === 1) {
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

<class lang="scss" scoped>
.bar {
  position: relative;

  .fill {
    background: lightblue;
    height: 100%;
  }

  .digits {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</class>
