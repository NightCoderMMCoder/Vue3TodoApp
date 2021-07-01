<template>
  <div class="card">
    <div class="card-header bg-primary">Add Todo</div>
    <div class="card-body">
      <form @submit.prevent="handleSubmit">
        <div class="mb-2">
          <label for="task">Task</label>
          <input type="text" class="form-control" id="task" v-model="task" />
        </div>
        <div class="mb-2">
          <label for="dueDate">Due Date</label>
          <input
            type="date"
            class="form-control"
            id="dueDate"
            v-model="dueDate"
          />
        </div>
        <button class="btn btn-primary mt-2">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
import db from "../../firebase/init";
import { useRouter } from "vue-router";

import { reactive, toRefs } from "vue";
export default {
  setup() {
    const router = useRouter();
    const todo = reactive({
      task: "",
      dueDate: null,
    });

    const handleSubmit = async () => {
      const doc = await db.collection("todos").add(todo);
      router.push({ name: "Home" });
    };

    return { ...toRefs(todo), handleSubmit };
  },
};
</script>

<style></style>
