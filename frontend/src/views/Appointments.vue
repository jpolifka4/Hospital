<template>
<div id="appointments">
  <Nav/>
  <div class="container mt-3">
    <h1>Manage appointments</h1>
    <!-- Form -->
    <form @submit.prevent="saveData" class="mt-3">
      <div class="mb-3">
        <select class="form-control" name="status" id="status" v-model="form.status" required>
          <option value="" disabled selected hidden>Appointment Status</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
          <option value="Delayed">Delayed</option>
          <option value="Missed">Missed</option>
          <option value="Cancelled">Cancelled</option></select>
      </div>
      <div class="mb-3">
        <input type="text" class="form-control" name="location" id="location" v-model="form.location" placeholder="Location..."
          required>
      </div>
      <div class="mb-3">
        <select class="select2-search__field form-control" name="doctor" id="doctor" v-model="form.doctor">
          <option value="" disabled selected hidden>Doctor</option>
          <option v-for="(doctor, i) in doctors" :key="i" :value="doctor.lname">{{ doctor.lname }}, {{ doctor.fname }}</option>
        </select>
      </div>
      <div class="mb-3">
        <select class="select2-search__field form-control" name="patient" id="patient" v-model="form.patient">
          <option value="" disabled selected hidden>Patient</option>
          <option v-for="(patient, i) in patients" :key="i" :value="patient.lname">{{ patient.lname }}, {{ patient.fname }}</option>
        </select>
      </div>
      <div class="mb-3">
        <input type="date" class="form-control" name="aptDate" id="aptDate" v-model="form.aptDate" required>
      </div>
      <div class="mb-3">
        <input type="time" class="form-control" name="aptTime" id="aptTime" v-model="form.aptTime" required>
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
          <th>Status</th>
          <th>Location</th>
          <th>Doctor</th>
          <th>Patient</th>
          <th>Date</th>
          <th>Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(appointment, i) in appointments" :key=i>
          <td>{{ appointment.status }}</td>
          <td>{{ appointment.location }}</td>
          <td>{{ appointment.doctor }}</td>
          <td>{{ appointment.patient }}</td>
          <td>{{ appointment.aptDate }}</td>
          <td>{{ appointment.aptTime }}</td>
          <td>
            <button class="btn btn-link pt-0" @click="editRow(appointment)">
              <i class="fa fa-edit" style="font-size:24px;color:darkgreen"></i>
            </button>
            <button class="btn btn-link pt-0" @click="deleteRow(appointment._id)">
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
  name: "appointments",
  components: {
    Nav,
  },
  data() {
    return {
      form: {
          status: "",
          location: "",
          doctor: "",
          patient: "",
          aptDate: new Date().toISOString().split("T")[0],
          aptTime: "",
        },
        appointments: [],
        doctors: [],
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
            url: `${baseURL}/appointments/save`,
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
            url: `${baseURL}/appointments/list`,
            dataType: "json",
            success: function (data, status) {
              if (status === 'success') {
                $this.appointments = data;
                $this.isData = $this.appointments.length > 0 ? true : false;
              }
            }
          })
        },

        listDoctors: function () {
          let $this = this;
          $.ajax({
            type: "GET",
            url: `${baseURL}/doctors/list`,
            dataType: "json",
            success: function (data, status) {
              if (status === 'success') {
                $this.doctors = data;
              }
            }
          })
        },

        listPatients: function () {
          let $this = this;
          $.ajax({
            type: "GET",
            url: `${baseURL}/patients/list`,
            dataType: "json",
            success: function (data, status) {
              if (status === 'success') {
                $this.patients = data;
              }
            }
          })
        },

        deleteRow: function (id) {
          let $this = this;
          $.ajax({
            type: "DELETE",
            url: `${baseURL}/appointments/delete/${id}`,
            success: function (data, status) {
              if (status === 'success') {
                alert('Entry deleted');
                $this.listData();
              }
            }
          })
        },

        editRow: function (appointment) {
          this.isUpdate = true;
          this.form.status = appointment.status;
          this.form.location = appointment.location;
          this.form.doctor = appointment.doctor;
          this.form.patient = appointment.patient;
          this.form.aptDate = appointment.aptDate;
          this.form.aptTime = appointment.aptTime;
          this.updateID = appointment._id;
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
            url: `${baseURL}/appointments/update/${this.updateID}`,
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
            url: `${baseURL}/appointments/search/${this.searchterm}`,
            success: function (data, status) {
              if (status === 'success') {
                $this.appointments = data;
                $this.isData = $this.appointments.length > 0 ? true : false;
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
        this.listDoctors();
        this.listPatients();
      }
}
</script>