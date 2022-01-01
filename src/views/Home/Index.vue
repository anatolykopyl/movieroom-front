<template>
  <div class="home">
    <form @submit.prevent>
      <input
        type="text"
        v-model="magnet"
        placeholder="magnet link"
      >
      <button
        @click="submit"
      >
        create room
      </button>
    </form>
    <a href="https://nutbread.github.io/t2m/">convert .torrent file to a magnet link</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import createRoom from '@/api/createRoom';

import { Room } from '@/interfaces';

export default defineComponent({
  name: 'Home',
  data() {
    return {
      magnet: '',
    };
  },
  methods: {
    async submit() {
      const room: Room = await createRoom(this.magnet);
      this.$router.push({ name: 'Room', params: { id: room.id } });
    },
  },
});
</script>

<style lang="scss" scoped>
form {
  margin-bottom: 32px;

  > * {
    margin: 0 8px;
  }
}
</style>
