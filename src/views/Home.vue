<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col>{{ now }}</b-col>
    </b-row>
    <b-row v-for="hour in hours">
      <b-col class="pr-0">
        <div class="time">{{ hour.toString().padStart(2, '0') }}</div>
      </b-col>
      <b-col class="px-0">
        <div class="time">
          <span>-</span>
          <a href="#">
            <i class="fa fa-plus-square-o fa-lg"></i>
          </a>
        </div>
      </b-col>
      <b-col class="pl-0">
        <div class="time">-</div>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      now: null,
      hours: []
    }
  },
  mounted() {
    this.hours = Array.from({length: 24}, (v, k) => k);

    setInterval(() => {
      this.now = this.$moment().format('YYYY MMMM Do, a h:mm:ss');
    }, 1000);
  }
}
</script>

<style>
  .time {
    border: solid #333 1px;
  }
</style>
