<template>
  <div id="admin">
    <NavAdmin/>
    <div class="container mt-3">
      <h1>Welcome Admin</h1>
    </div>
  </div>
</template>

<script>
import NavAdmin from '@/components/NavAdmin.vue'

export default {
  name: 'Admin',
  components: {
    NavAdmin,
  }
}
</script>
