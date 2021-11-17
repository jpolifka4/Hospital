<template>
<div id="login">
    <div class="container mt-3">
        <h1>Login</h1>
        <!-- Form -->
        <form class="mt-3">
        <div class="mb-3">
            <input type="text" class="form-control" name="username" id="username" v-model="form.username" placeholder="Username..."
            required @keypress.enter="login">
        </div>
        <div class="mb-3">
            <input type="password" class="form-control" name="password" id="password" v-model="form.password" placeholder="Password..."
            required @keypress.enter="login">
        </div>
        <button type="button" @click="login" class="btn btn-primary mt-3">Submit</button>
        </form>
    </div>
</div>

    
</template>

<script>

export default {
    name: "login",
    
    data() {
        return {
            form: {
                username: "",
                password: "",
            }
        }
    },

    methods: {
        login: function () {
            let $this = this;
          $.ajax({
            type: "POST",
            url: `${baseURL}/login/`,
            data: this.form,
            success: function (data, status) {
              if (status === 'success') {
                 console.log(data)
                 if (data.length === 0) {
                     alert("Username or password is incorrect")
                     return;
                 }
                 if (data[0].type === "admin") {
                     alert("You are admin")
                     $this.$router.push("/admin")
                 }
                 else if (data[0].type === "staff") {
                     alert("You are staff")
                     $this.$router.push("/home")

                 }
                for (let i in $this.form) $this.form[i] = '';
              }
            }
          })
        }
    }
}
</script>