<template>
  <nav class="navbar navbar-expand-lg bg-primary py-3">
    <div class="container">
      <h4 class="navbar-brand mb-0">Todos</h4>
      <ul class="navbar-nav">
        <li class="nav-item me-5">
          Home
        </li>
        <li class="nav-item">Add Todo</li>
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
ul li {
  cursor: pointer;
}
.router-link-exact-active li {
  border-bottom: 3px solid #fff;
}
</style>
