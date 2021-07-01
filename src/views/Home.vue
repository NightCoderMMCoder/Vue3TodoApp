<template>
  <div class="home">
    <SearchBox />
    <TodosList />
  </div>
</template>

<script>
import SearchBox from "../components/Todos/SearchBox.vue";
import TodosList from "../components/Todos/TodosList.vue";
export default {
  components: { SearchBox, TodosList },
  name: "Home",
};
</script>
