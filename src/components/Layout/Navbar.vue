<template>
  <nav class="navbar navbar-expand-lg bg-primary py-3">
    <div class="container">
      <h4 class="navbar-brand mb-0">Todos</h4>
      <ul class="navbar-nav">
        <router-link class="nav-item me-5" :to="{ name: 'Home' }">
          Home
        </router-link>
        <router-link class="nav-item" :to="{ name: 'AddTodo' }"
          >Add Todo</router-link
        >
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
ul {
  width: 100%;
  display: flex;
  justify-content: center;
}
ul div {
  display: flex;
}
ul a {
  cursor: pointer;
}
.router-link-exact-active {
  border-bottom: 3px solid #fff;
}
</style>
