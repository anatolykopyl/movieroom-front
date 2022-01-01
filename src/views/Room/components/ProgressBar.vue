<template>
  <div class="bar">
    <div
      class="fill"
      :style="{
        width: `${progressPerc}%`
      }"
    />
    <div class="digits">
      {{ progressPerc }}%
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    progress: {
      type: Number,
      required: true,
    },
  },
  computed: {
    progressPerc() {
      return Math.floor(this.progress * 100);
    },
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
