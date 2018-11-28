<template>
  <div class="animated fadeIn pt-5">
    <b-card>
      <div slot="header">
        <b-row class="d-flex justify-content-between px-3">
          <a href="#">
            <i class="fa fa-angle-left fa-lg"></i>
          </a>
          <span>{{ now }}</span>
          <a href="#">
            <i class="fa fa-angle-right fa-lg"></i>
          </a>
        </b-row>
      </div>
      <b-row class="pb-2 text-right">
        <b-col>
          <b-button class="mr-1" variant="outline-primary" v-b-modal.add-category-modal>
            Add Category
          </b-button>
          <b-button class=""variant="outline-primary" v-b-modal.add-schedule-modal>
            Add Schedule
          </b-button>
        </b-col>
      </b-row>
      <table class="table b-table table-striped table-hover table-bordered b-table-fixed">
        <thead>
        <tr>
          <td>Hour</td>
          <td>Work</td>
          <td>Life</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in schedule">
          <td>{{ row.hour.toString().padStart(2, '0') }}</td>
          <td class="yon-pointer" :style="row.work==='work' ? {backgroundColor: '#ffc107'} : {}">{{ row.work }}</td>
          <td class="yon-pointer" :style="row.life==='sleep' ? {backgroundColor: '#63c2de'} : {}">{{ row.life }}</td>
        </tr>
        </tbody>
      </table>
    </b-card>

    <b-modal id="add-category-modal" title="Add Category" ok-title="Add">
      <b-form>
        <b-form-group label="Category Name"
                      label-for="category-name-input">
          <b-form-input id="category-name-input"
                        type="text"
                        v-model="categoryName">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Category Color"
                      label-for="category-color-input">
          <b-form-input id="category-color-input"
                        type="color"
                        v-model="categoryColor">
          </b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>

    <b-modal id="add-schedule-modal" title="Add Schedule" ok-title="Add">
      <b-form>
        <b-form-group label="Category Name"
                      label-for="category-name-input">
          <b-form-input id="category-name-input"
                        type="text"
                        v-model="categoryName">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Category Color"
                      label-for="category-color-input">
          <b-form-input id="category-color-input"
                        type="color"
                        v-model="categoryColor">
          </b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      now: null,
      schedule: [
        {
          hour: 0, work: null, life: "sleep"
        },
        {
          hour: 1, work: null, life: "sleep"
        },
        {
          hour: 2, work: null, life: "sleep"
        },
        {
          hour: 3, work: null, life: "sleep"
        },
        {
          hour: 10, work: "work", life: null
        },
        {
          hour: 11, work: "work", life: null
        }
      ],
      hours: [],
      categoryName: '',
      categoryColor: ''
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
  .yon-pointer {
    cursor: pointer;
  }
</style>
