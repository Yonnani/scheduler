<template>
  <div class="animated fadeIn pt-5">
    <b-card header="To do 리스트">
      <b-row>
        <b-col class="d-flex justify-content-between">
          <b-form-input v-model="newTodo" class="mr-2"></b-form-input>
          <b-button class="float-right" variant="outline-primary">Add To Do</b-button>
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col>
          <div v-for="todo in todoList"
               :key="todo.id">
            <b-form-checkbox v-model="todo.done">
              {{ todo.content }}
            </b-form-checkbox>
          </div>
        </b-col>
      </b-row>
    </b-card>

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
          <tr>
            <td rowspan="6">테스트</td>
            <td style="background-color: indianred;"></td>
            <td></td>
          </tr>
          <tr>
            <td style="background-color: aquamarine;"></td>
            <td></td>
          </tr>
          <tr>
            <td style="background-color: beige;"></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>테스트</td>
            <td class="p-0">
              <div style="border: 1px solid blue;"></div>
            </td>
            <td></td>
          </tr>
          <tr v-for="anHour in hours" :key="anHour">
            <td>{{ anHour }}</td>
            <td>
              <span v-html="todayWorks
                              .filter(work => work.startDateTime.getHours() === anHour)
                              .map(work => `${work.startDateTime.getMinutes()}min~ ${work.what}`)
                              .join('<br>')" />
              <br>
              <span v-html="todayWorks
                              .filter(work => work.endDateTime.getHours() === anHour)
                              .map(work => `~${work.endDateTime.getMinutes()}min ${work.what}`)
                              .join('<br>')" />
            </td>
            <td></td>
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
        <v-date-picker
          mode="single"
          v-model="selectedValue">
        </v-date-picker>
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
      categories: [],
      todayWorks: [],
      categoryName: '',
      categoryColor: '',
      selectedValue: new Date(),
      todoList: [],
      newTodo: ''
    }
  },
  mounted() {
    this.hours = Array.from({length: 24}, (v, k) => k);

    setInterval(() => {
      this.now = this.$moment().format('YYYY MMMM Do, a h:mm:ss');
    }, 1000);

    this.categories = [
      {
        name: 'work',
        color: '#ffc107'
      },
      {
        name: 'life',
        color: '#63c2de'
      }
    ];

    this.todayWorks = [
      {
        startDateTime: new Date('2018/12/10/09:30:00'),
        endDateTime: new Date('2018/12/10/10:30:00'),
        what: '출근 준비'
      },
      {
        startDateTime: new Date('2018/12/10/10:30:00'),
        endDateTime: new Date('2018/12/10/10:45:00'),
        what: '출근'
      }
    ];

    this.todoList = [
      { id: 1, content: 'easy english 듣기', done: false },
      { id: 2, content: '한복 맡기기', done: false },
      { id: 3, content: '운동화 세탁', done: false }
    ];

    var firebase = this.$firebase;
    var auth = firebase.auth();
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log({token, user});
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
}
</script>

<style>
  .yon-pointer {
    cursor: pointer;
  }
</style>
