<template>
  <div id="patients">
   <Nav/>
  <div class="container mt-3">
    
    <h1>Manage Patients</h1>
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
        <input type="text" class="form-control" name="sex" id="sex" v-model="form.sex"
          placeholder="Sex..." required>
      </div>
      <div class="mb-3">
        <input type="text" class="form-control" name="address" id="address" v-model="form.address"
          placeholder="Address..." required>
      </div>
      <div class="mb-3">
        <input type="text" pattern="[0-9]{5}" class="form-control" name="zip" id="zip" v-model="form.zip"
          placeholder="Zip code..." required>
      </div>
      <div class="mb-3">
        <input type="tel" pattern="[0-9]{10}" class="form-control" name="phone" id="phone" v-model="form.phone"
          placeholder="Phone Number..." required>
      </div>
      <div class="mb-3">
        <input type="date" class="form-control" name="birthDate" id="birthDate" v-model="form.birthDate" required>
      </div>
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
          <th>Sex</th>
          <th>Address</th>
          <th>Zip Code</th>
          <th>Phone</th>
          <th>Date of Birth</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(patient, i) in patients" :key=i>
          <td>{{ patient.lname }}, {{ patient.fname }}</td>
          <td>{{ patient.sex }}</td>
          <td>{{ patient.address }}</td>
          <td>{{ patient.zip }}</td>
          <td>{{ patient.phone }}</td>
          <td>{{ patient.birthDate }}</td>
          <td>
            <button class="btn btn-link pt-0" @click="editRow(patient)">
              <i class="fa fa-edit" style="font-size:24px;color:darkgreen"></i>
            </button>
            <button class="btn btn-link pt-0" @click="deleteRow(patient._id)">
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
  name: "patients",
  components: {
    Nav,
  },
  data() {
    return {
      form: {
          lname: "",
          fname: "",
          sex: "",
          address: "",
          zip: "",
          phone: "",
          birthDate: new Date().toISOString().split("T")[0],
        },
        patients: [],
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
            url: `${baseURL}/patients/save`,
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
            url: `${baseURL}/patients/list`,
            dataType: "json",
            success: function (data, status) {
              if (status === 'success') {
                $this.patients = data;
                $this.isData = $this.patients.length > 0 ? true : false;
              }
            }
          })
        },

        deleteRow: function (id) {
          let $this = this;
          $.ajax({
            type: "DELETE",
            url: `${baseURL}/patients/delete/${id}`,
            success: function (data, status) {
              if (status === 'success') {
                alert('Entry deleted');
                $this.listData();
              }
            }
          })
        },

        editRow: function (patient) {
          this.isUpdate = true;
          this.form.lname = patient.lname;
          this.form.fname = patient.fname;
          this.form.sex = patient.sex;
          this.form.address = patient.address;
          this.form.zip = patient.zip;
          this.form.phone = patient.phone;
          this.form.birthDate = patient.birthDate;
          this.updateID = patient._id;
        },

        cancelEdit: function () {
          this.isUpdate = false;
          for (let i in this.form) this.form[i] = '';
          this.form.birthDate = new Date().toISOString().split("T")[0];
        },

        updateRow: function () {
          let $this = this;
          $.ajax({
            type: "PUT",
            url: `${baseURL}/patients/update/${this.updateID}`,
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
            url: `${baseURL}/patients/search/${this.searchterm}`,
            success: function (data, status) {
              if (status === 'success') {
                $this.patients = data;
                $this.isData = $this.patients.length > 0 ? true : false;
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