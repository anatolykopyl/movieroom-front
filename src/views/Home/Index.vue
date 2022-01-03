<template>
  <div class="home">
    <form @submit.prevent>
      <input
        type="file"
        placeholder="file"
        @change="handleFile"
        accept="video/mp4"
      >

      <div class="secondary">or</div>

      <input
        type="text"
        v-model="magnet"
        placeholder="magnet link"
      >

      <div class="submit">
        <button
          @click="submit"
        >
          create room
        </button>
        <Spinner v-if="waiting" class="spinner" />
      </div>
    </form>
    <a href="https://nutbread.github.io/t2m/">convert .torrent file to a magnet link</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import createRoom from '@/api/createRoom';
import Spinner from '@/components/Spinner.vue';

import { Room } from '@/interfaces';

export default defineComponent({
  name: 'Home',
  components: {
    Spinner,
  },
  data() {
    return {
      magnet: '',
      file: undefined as File | undefined,
      waiting: false,
    };
  },
  methods: {
    async submit() {
      this.waiting = true;
      let room: Room;
      if (this.file) {
        room = await createRoom(this.file);
      } else {
        room = await createRoom(this.magnet);
      }
      this.waiting = false;
      this.$router.push({ name: 'Room', params: { id: room.id } });
    },
    handleFile(event: Event) {
      const element = (event.target as HTMLInputElement);
      if (element.files) {
        [this.file] = element.files;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
form {
  margin-bottom: 32px;

  > * {
    display: block;
    margin: 8px 0;
    width: 100%;
  }

  .submit {
    position: relative;
    display: flex;
    align-items: center;

    button {
      width: 100%;
    }

    .spinner {
      position: absolute;
      right: -48px;
      width: 32px;
      height: 32px;
    }
  }
}
</style>
