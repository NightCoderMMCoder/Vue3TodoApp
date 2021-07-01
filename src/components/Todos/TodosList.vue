<template>
  <div class="todos-list">
    <div class="loader" v-if="loading">
      <PulseLoader />
    </div>
    <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" v-else />
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  components: { TodoItem, PulseLoader },
  props: { todos: Array, loading: Boolean },
};
</script>
<style scoped>
.loader {
  width: 100%;
  text-align: center;
  margin-top: 50px;
}
</style>
