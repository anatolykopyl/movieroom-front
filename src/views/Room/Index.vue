<template>
  <div class="room">
    <h1>{{ room.movie }}</h1>
    <Progress
      v-if="!room.downloaded"
      :id="id"
      @downloaded="onDownloaded"
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

import Progress from './components/Progress.vue';

import { Room } from '@/interfaces';

export default defineComponent({
  name: 'Room',
  components: {
    Progress,
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
    async onDownloaded() {
      if (!this.room.downloaded) {
        this.room = await getRoom(this.id);
      }
      this.$nextTick(() => {
        const element = this.$refs.video as HTMLVideoElement;
        this.positionInterval = setInterval(async () => {
          if (this.playing) {
            const serverPosition = await getPosition(this.id);
            // console.log(`L: ${element.currentTime}; S: ${serverPosition}`);
            if (Math.abs(element.currentTime - serverPosition) > 2) {
              element.currentTime = serverPosition;
              console.log('Synced');
            }
          }
        }, 2 * 1000);
      });
    },
    seeked() {
      const element = this.$refs.video as HTMLVideoElement;
      setPosition(this.id, element.currentTime);
    },
  },
});
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 32px;
}

video {
  width: 800px;
  max-width: 100%;
}
</style>
