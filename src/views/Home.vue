<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col><h1>{{ now }}</h1></b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button variant="primary">Add Category</b-button>
      </b-col>
    </b-row>
    <b-row v-for="hour in hours" :key="hour">
      <b-col class="pr-0">
        <div class="time">{{ hour.toString().padStart(2, '0') }}</div>
      </b-col>
      <b-col class="px-0">
        <div class="time">
          <span>-</span>
          <!--<a href="#">-->
            <!--<i class="fa fa-plus-square-o fa-lg"></i>-->
          <!--</a>-->
        </div>
      </b-col>
      <b-col class="pl-0">
        <div class="time">-</div>
      </b-col>
    </b-row>
    <b-row>
      <b-card :header="now">
        <b-table dark hover striped bordered small fixed responsive
                 :items="hours"><!--  :fields="captions" -->
        </b-table>
      </b-card>
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
    border: solid #20a8d8 1px;
    cursor: pointer;
  }

  .time:hover {
    background-color: #20a8d8;
  }
</style>
