<template>
  <div class="home">
    <input
      type="text"
      v-model="magnet"
      placeholder="magnet"
    >
    <button
      @click="submit"
    >
      Create room
    </button>
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
