<template>
  <div class="home">
    <SearchBox @set-sort-type="setSortType" v-model:search="search" />
    <TodosList :todos="searchTodos" />
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import SearchBox from "../components/Todos/SearchBox.vue";
import TodosList from "../components/Todos/TodosList.vue";
export default {
  components: { SearchBox, TodosList },
  name: "Home",
  setup() {
    const sortType = ref("");
    const search = ref("");
    const activeSearch = ref("");
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
        dueDate: new Date(2021, 6, 4),
      },
      {
        id: 3,
        task: "Go Shopping",
        important: true,
      },
    ]);

    const setSortType = (type) => {
      sortType.value = type;
    };

    const sortedTodos = computed(() => {
      if (sortType.value === "completed") {
        return todos.value.filter((todo) => todo.completed);
      } else if (sortType.value === "importance") {
        return todos.value.filter((todo) => todo.important);
      } else if (sortType.value === "alphabetically") {
        return todos.value.slice(0).sort((a, b) => {
          if (a.task > b.task) return 1;
          if (a.task < b.task) return -1;
          return 0;
        });
      } else if (sortType.value === "dueDate") {
        return todos.value
          .filter((todo) => todo.dueDate)
          .sort((a, b) => {
            return b.dueDate - a.dueDate;
          });
      }
      return todos.value;
    });

    watch(search, (val) => {
      setTimeout(() => {
        if (val === search.value) {
          activeSearch.value = val;
        }
      }, 300);
    });

    const searchTodos = computed(() => {
      if (activeSearch.value) {
        return sortedTodos.value.filter((todo) =>
          todo.task.toUpperCase().includes(search.value.toUpperCase())
        );
      }
      return sortedTodos.value;
    });

    return { todos, setSortType, sortedTodos, search, searchTodos };
  },
};
</script>
