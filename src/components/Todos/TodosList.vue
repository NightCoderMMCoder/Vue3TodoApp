<template>
  <div class="todos-list">
    <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
  </div>
</template>

<script>
import { ref } from "vue";
import TodoItem from "./TodoItem.vue";
export default {
  components: { TodoItem },
  setup() {
    const todos = ref([
      {
        id: 1,
        task: "Homework",
        completed: true,
        important: true,
        dueDate: new Date(2021, 6, 3),
      },
      {
        id: 2,
        task: "Buy Ticket",
        completed: true,
      },
      {
        id: 3,
        task: "Go Shopping",
        important: true,
      },
    ]);
    return { todos };
  },
};
</script>
