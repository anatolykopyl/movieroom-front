<template>
  <div class="room">
    <h1>{{ room.movie }}</h1>
    <div v-if="!room.downloaded">
      <div>{{ progressPerc }}%</div>
      <ProgressBar
        :progress="progress"
        class="progress-bar"
      />
    </div>

    <video
      v-if="room.downloaded"
      controls
      :src="movieUrl"
      ref="video"
      @seeked="seeked"
      @play="playing = true"
      @pause="playing = false"
    >
    </video>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import getRoom from './getRoom';
import getStatus from './getStatus';
import setPosition from './setPosition';
import getPosition from './getPosition';

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
      progress: 0,
      playing: false,
      progressInterval: undefined as undefined | number,
      positionInterval: undefined as undefined | number,
    };
  },
  computed: {
    movieUrl() {
      return `${process.env.VUE_APP_MOVIES}?id=${this.room.id}`;
    },
    progressPerc() {
      return Math.floor(this.progress * 100);
    },
  },
  async mounted() {
    this.room = await getRoom(this.id);

    if (!this.room.downloaded) {
      this.progressInterval = setInterval(async () => {
        const result = await getStatus(this.id);
        this.progress = result.progress;
        if (result.downloaded) {
          this.room.downloaded = true;
          clearInterval(this.progressInterval);
        }
      }, 2 * 1000);
    } else {
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
    }
  },
  beforeUnmount() {
    clearInterval(this.progressInterval);
    clearInterval(this.positionInterval);
  },
  methods: {
    seeked() {
      const element = this.$refs.video as HTMLVideoElement;
      const position = element.currentTime;
      setPosition(this.id, position);
    },
  },
});
</script>

<style lang="scss" scoped>
h1 {
  font-size: 32px;
}
.progress-bar {
  width: 400px;
  height: 25px;
  border: 1px solid black;
  margin: auto;
}

video {
  width: 800px;
  max-width: 100%;
}
</style>
