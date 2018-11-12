<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col>{{ now }}</b-col>
    </b-row>
    <b-row>
      <b-col>
        <ul>
          <li class="time">00</li>
          <li class="time">01</li>
          <li class="time">02</li>
          <li class="time">03</li>
          <li class="time">04</li>
          <li class="time">05</li>
        </ul>
      </b-col>
      <b-col></b-col>
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      now: null
    }
  },
  mounted() {
    setInterval(() => {
      this.now = this.$moment().format('YYYY MMMM Do, a h:mm:ss');
    }, 1000);
  }
}
</script>

<style>
  .time {
    list-style: none;
    border: solid #333 1px;
  }
</style>
