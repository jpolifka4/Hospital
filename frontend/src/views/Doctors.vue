<template>
<div id="doctors">
  <Nav/>
  <div class="container mt-3">
    <h1>Manage Doctors</h1>
    <!-- Form -->
    <form @submit.prevent="saveData" class="mt-3">
      <div class="mb-3">
        <input type="text" class="form-control" name="fname" id="fname" v-model="form.fname" placeholder="First name..."
          required>
      </div>
      <div class="mb-3">
        <input type="text" class="form-control" name="lname" id="lname" v-model="form.lname" placeholder="Last name..."
          required>
      </div>
      <div class="mb-3">
        <input type="tel" pattern="[0-9]{10}" class="form-control" name="phone" id="phone" v-model="form.phone"
          placeholder="Phone Number..." required>
      </div>
      <div class="mb-3">
        <input type="text" class="form-control" name="specialty" id="specialty" v-model="form.specialty" placeholder="Specialty..." required>
      </div>
      <!-- <div class="mb-3">
        <select class="select2-search__field form-control" name="group" id="group" v-model="form.group">
          <option v-for="(group, i) in groups" :key="i" :value="group.name">{{ group.name }}</option>
        </select>
      </div> -->
      <button type="submit" v-show="!isUpdate" class="btn btn-primary mt-3">Submit</button>
      <button type="button" v-show="isUpdate" @click="updateRow" class="btn btn-success mt-3">Update</button>
      <button type="button" v-show="isUpdate" @click="cancelEdit" class="btn btn-warning mt-3">Cancel</button>
    </form>

<!-- Search -->
    <div class="input-group mt-3">
      <input @input="checkEmpty" @keypress.enter="search" v-model="searchterm" type="text" class="form-control"
        placeholder="Search..." aria-label="Rsearch" aria-describedby="button-addon2">
      <button class="btn btn-outline-primary" type="button" @click="search">Search</button>
    </div>

    <!-- Table -->
    <table class="table table-striped mt-3" v-show="isData">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Specialty</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(doctor, i) in doctors" :key=i>
          <td>{{ doctor.lname }}, {{ doctor.fname }}</td>
          <td>{{ doctor.phone }}</td>
          <td>{{ doctor.specialty }}</td>
          <td>
            <button class="btn btn-link pt-0" @click="editRow(doctor)">
              <i class="fa fa-edit" style="font-size:24px;color:darkgreen"></i>
            </button>
            <button class="btn btn-link pt-0" @click="deleteRow(doctor._id)">
              <i class="fa fa-trash-o" style="font-size:24px;color:red"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-show="!isData" class="alert alert-warning mt-3">
      No data to show at the moment
    </div>

  </div>
</div>
  
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  name: "doctors",
  components: {
    Nav,
  },
  data() {
    return {
      form: {
          lname: "",
          fname: "",
          phone: "",
          specialty: "",
        },
        doctors: [],
        isUpdate: false,
        updateID: '',
        searchterm: '',
        isData: true
    }
  },

  methods: {
    saveData: function () {
          let $this = this;
          $.ajax({
            type: "POST",
            url: `${baseURL}/doctors/save`,
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
            url: `${baseURL}/doctors/list`,
            dataType: "json",
            success: function (data, status) {
              if (status === 'success') {
                $this.doctors = data;
                $this.isData = $this.doctors.length > 0 ? true : false;
              }
            }
          })
        },

        deleteRow: function (id) {
          let $this = this;
          $.ajax({
            type: "DELETE",
            url: `${baseURL}/doctors/delete/${id}`,
            success: function (data, status) {
              if (status === 'success') {
                alert('Entry deleted');
                $this.listData();
              }
            }
          })
        },

        editRow: function (doctor) {
          this.isUpdate = true;
          this.form.lname = doctor.lname;
          this.form.fname = doctor.fname;
          this.form.phone = doctor.phone;
          this.form.specialty = doctor.specialty;
          this.updateID = doctor._id;
        },

        cancelEdit: function () {
          this.isUpdate = false;
          for (let i in this.form) this.form[i] = '';
        },

        updateRow: function () {
          let $this = this;
          $.ajax({
            type: "PUT",
            url: `${baseURL}/doctors/update/${this.updateID}`,
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

        search: function () {
          let $this = this;
          $.ajax({
            type: "GET",
            url: `${baseURL}/doctors/search/${this.searchterm}`,
            success: function (data, status) {
              if (status === 'success') {
                $this.doctors = data;
                $this.isData = $this.doctors.length > 0 ? true : false;
              }
            }
          })
        },

        checkEmpty: function () {
          if (!this.searchterm) {
            this.listData();
          }
          else {
            this.search();
          }
        },
  },

  mounted() {
        this.listData();
      }
}
</script>