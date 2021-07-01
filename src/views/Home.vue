<template>
  <div class="home">
    <SearchBox @set-sort-type="setSortType" v-model="search" />
    <TodosList :todos="searchTodos" :loading="loading" />
  </div>
</template>

<script>
import { computed, ref, watch, onMounted } from "vue";
import SearchBox from "../components/Todos/SearchBox.vue";
import TodosList from "../components/Todos/TodosList.vue";
import db from "../firebase/init";

export default {
  components: { SearchBox, TodosList },
  name: "Home",
  setup() {
    const sortType = ref("");
    const search = ref("");
    const activeSearch = ref("");

    const todos = ref([]);

    const loading = ref(true);

    onMounted(async () => {
      const collectionRef = db.collection("todos").orderBy("createdAt", "desc");
      // const snapshot = await collectionRef.get();
      // snapshot.docs.forEach((doc) => {
      //   todos.value.push({ ...doc.data(), id: doc.id });
      // });
      // loading.value = false;
      collectionRef.onSnapshot((snapshot) => {
        const results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        todos.value = results;
        loading.value = false;
      });
    });

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

    return { todos, setSortType, sortedTodos, search, searchTodos, loading };
  },
};
</script>
