<template>
  <div id="home">
    <Nav/>
    <div class="container mt-3">
      <h1>Welcome Staff</h1>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'

export default {
  name: 'Home',
  components: {
    Nav,
  }
}
</script>
