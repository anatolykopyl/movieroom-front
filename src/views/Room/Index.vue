<template>
  <div class="room">
    <h1>{{ room.movie }}</h1>
    <ProgressBar
      v-if="!room.downloaded"
      :id="id"
      @downloaded="onDownloaded"
      class="progress-bar"
    />

    <video
      v-if="room.downloaded"
      controls
      ref="video"
      @seeked="seeked"
      @play="playing = true"
      @pause="playing = false"
    >
      <source :src="movieUrl" type="video/mp4">
    </video>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import getRoom from '@/api/getRoom';
import setPosition from '@/api/setPosition';
import getPosition from '@/api/getPosition';

import ProgressBar from './components/ProgressBar.vue';

import { Room } from '@/interfaces';

export default defineComponent({
  name: 'Room',
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
      room: {} as Room,
      playing: false,
      positionInterval: undefined as undefined | number,
    };
  },
  computed: {
    movieUrl() {
      return `${process.env.VUE_APP_MOVIES}?filename=${this.room.filename}`;
    },
  },
  async mounted() {
    this.room = await getRoom(this.id);
    if (this.room.downloaded) {
      this.onDownloaded();
    }
  },
  beforeUnmount() {
    clearInterval(this.positionInterval);
  },
  methods: {
    onDownloaded() {
      this.room.downloaded = true;
      this.$nextTick(() => {
        const element = this.$refs.video as HTMLVideoElement;
        this.positionInterval = setInterval(async () => {
          if (this.playing) {
            const serverPosition = await getPosition(this.id);
            // this.room.position = element.currentTime;
            if (Math.abs(this.room.position - serverPosition) > 2) {
              this.room.position = serverPosition;
              element.currentTime = serverPosition;
              console.log('Synced');
            }
          }
        }, 2 * 1000);
      });
    },
    seeked() {
      const element = this.$refs.video as HTMLVideoElement;
      const position = element.currentTime;
      setPosition(this.id, position);
    },
  },
});
</script>

<style lang="scss" scoped>
.progress-bar {
  width: 400px;
  height: 25px;
  border: 1px solid black;
  margin: auto;
}

h1 {
  margin-bottom: 32px;
}

video {
  width: 800px;
  max-width: 100%;
}
</style>
