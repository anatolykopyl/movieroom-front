<template>
  <div>
    <div
      class="fill"
      :style="{
        width: `${progress * 100}%`
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    progress: {
      type: Number,
      default: 0,
    },
  },
});
</script>

<class lang="scss" scoped>
.fill {
  background: lightblue;
  height: 100%;
}
</class>
