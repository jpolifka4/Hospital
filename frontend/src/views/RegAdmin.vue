<template>
  <div id="admin">
    <NavAdmin/>
    <div class="container mt-3">
      <h1>Manage Admin</h1>

      <form @submit.prevent="checkName" class="mt-3">
      <div class="mb-3">
        <input type="text" class="form-control" name="username" id="username" v-model="form.username" placeholder="Username..."
          required @keypress.enter="checkName">
      </div>
      <div class="mb-3">
        <input type="password" class="form-control" name="password" id="password" v-model="form.password" placeholder="Password..."
          required @keypress.enter="checkName">
      </div>
      <button type="submit" v-show="!isUpdate" class="btn btn-primary mt-3">Submit</button>
      <button type="button" v-show="isUpdate" @click="updateRow" class="btn btn-success mt-3">Update</button>
      <button type="button" v-show="isUpdate" @click="cancelEdit" class="btn btn-warning mt-3">Cancel</button>
    </form>

    <!-- Table -->
    <table class="table table-striped mt-3" v-show="isData">
      <thead>
        <tr>
          <th>Username</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, i) in users" :key=i>
          <td>{{ user.username }}</td>
          <td>
            <button class="btn btn-link pt-0" @click="editRow(user)">
              <i class="fa fa-edit" style="font-size:24px;color:darkgreen"></i>
            </button>
            <button class="btn btn-link pt-0" @click="deleteRow(user._id)">
              <i class="fa fa-trash-o" style="font-size:24px;color:red"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    </div>

  </div>
</template>

<script>
import NavAdmin from '@/components/NavAdmin.vue'

export default {
  name: 'RegAdmin',
  components: {
    NavAdmin,
  },
  data() {
    return {
      form: {
          username: "",
          password: "",
          type: "admin",
        },
        users: [],
        isUpdate: false,
        updateID: '',
        searchterm: '',
        isData: true
    }
  },

  methods: {
      checkName: function () {
          let $this = this;
          $.ajax({
            type: "GET",
            url: `${baseURL}/registration/checkname/${this.form.username}`,
            success: function (data, status) {
              if (status === 'success') {
                 console.log(data)
                 if (data.length === 0) {
                     $this.saveData();
                     return;
                 }
                 if (data.length > 0) {
                     alert("Username already in use.")
                 }
                for (let i in $this.form) $this.form[i] = '';
              }
            }
          })
        },

      saveData: function () {
          let $this = this;
          this.form["type"] = "admin";
          $.ajax({
            type: "POST",
            url: `${baseURL}/registration/save`,
            data: this.form,
            success: function (data, status) {
              if (status === 'success') {
                alert('Saved!');
                $this.listData();
                for (let i in $this.form) $this.form[i] = '';
              }
            }
          })
        },

        listData: function () {
          let $this = this;
          $.ajax({
            type: "GET",
            url: `${baseURL}/registration/list/${"admin"}`,
            success: function (data, status) {
              if (status === 'success') {
                $this.users = data;
                $this.isData = $this.users.length > 0 ? true : false;
              }
            }
          })
        },

        deleteRow: function (id) {
          let $this = this;
          this.form["type"] = "admin";
          $.ajax({
            type: "DELETE",
            url: `${baseURL}/registration/delete/${id}`,
            success: function (data, status) {
              if (status === 'success') {
                alert('Entry deleted');
                $this.listData();
              }
            }
          })
        },

        editRow: function (user) {
          this.isUpdate = true;
          this.form.username = user.username;
          this.form.password = user.password;
          this.updateID = user._id;
        },

        cancelEdit: function () {
          this.isUpdate = false;
          for (let i in this.form) this.form[i] = '';
        },

        updateRow: function () {
          let $this = this;
          this.form["type"] = "admin";
          $.ajax({
            type: "PUT",
            url: `${baseURL}/registration/update/${this.updateID}`,
            data: this.form,
            success: function (data, status) {
              if (status === 'success') {
                alert('Entry updated');
                $this.listData();
                $this.isUpdate = false;
                for (let i in $this.form) $this.form[i] = '';
              }
            }
          })
        },
      },

      mounted() {
        this.listData();
      }
}
</script>
