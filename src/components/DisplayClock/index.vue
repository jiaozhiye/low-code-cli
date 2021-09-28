<template>
  <span class="clock-wrapper">{{ timeText }}</span>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DisplayClock',
  data() {
    this.timer = null;
    return {
      timeText: '',
    };
  },
  created() {
    this.displayTime();
    this.startFn();
  },
  beforeUnmount() {
    this.stopFn();
  },
  methods: {
    displayTime() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minutes = date.getMinutes();
      const second = date.getSeconds();
      this.timeText =
        year +
        '-' +
        month +
        '-' +
        day +
        ' ' +
        this.check(hour) +
        ':' +
        this.check(minutes) +
        ':' +
        this.check(second);
    },
    check(val) {
      if (val < 10) {
        return '0' + val;
      }
      return val;
    },
    startFn() {
      this.stopFn();
      this.timer = setInterval(() => {
        this.displayTime();
      }, 1000);
    },
    stopFn() {
      this.timer && clearInterval(this.timer);
    },
  },
});
</script>

<style lang="scss" scoped>
.clock-wrapper {
  font-size: 16px;
  user-select: none;
}
</style>
