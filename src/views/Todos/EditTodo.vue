<template>
  <div class="card">
    <div class="card-header bg-primary">Edit Todo</div>
    <div class="card-body">
      <form @submit.prevent="handleSubmit">
        <div class="mb-2">
          <label for="task">Task</label>
          <input
            type="text"
            class="form-control"
            id="task"
            v-model="task"
            @blur="clearValidation('task')"
          />
          <small class="text-danger" v-if="errors.task">
            {{ errors.task }}
          </small>
        </div>
        <div class="mb-2">
          <label for="dueDate">Due Date</label>
          <input
            type="date"
            class="form-control"
            id="dueDate"
            v-model="dueDate"
            @blur="clearValidation('dueDate')"
          />
        </div>
        <button class="btn btn-primary mt-2" :disabled="loading">
          <ClipLoader :loading="loading" color="#fff" size="20px" /> Update
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive, ref, toRefs } from "vue";
import db from "../../firebase/init";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";

export default {
  components: { ClipLoader },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const todo = reactive({
      task: "",
      dueDate: null,
    });
    const errors = reactive({});
    const loading = ref(true);

    const handleSubmit = async () => {
      const isValidate = validation({ dueDate: false });
      if (isValidate) {
        loading.value = true;
        await db
          .collection("todos")
          .doc(route.params.id)
          .update(todo);
        router.push({ name: "Home" });
        loading.value = false;
      }
    };

    const validation = (checkValidation) => {
      let formValidate = true;
      for (let [key, value] of Object.entries(todo)) {
        if (!value && checkValidation[key] !== false) {
          formValidate = false;
          errors[key] = `Please enter the ${key} field.`;
        }
      }
      return formValidate;
    };

    const clearValidation = (key) => {
      if (todo[key]) {
        errors[key] = "";
      } else {
        errors[key] = `Please enter the ${key} field.`;
      }
    };

    onMounted(async () => {
      const { id } = route.params;
      const doc = await db
        .collection("todos")
        .doc(id)
        .get();
      if (doc.exists) {
        todo.task = doc.data().task;
        todo.dueDate = doc.data().dueDate;
        loading.value = false;
      } else {
        router.push({ name: "Home" });
      }
    });

    return { ...toRefs(todo), handleSubmit, errors, clearValidation, loading };
  },
};
</script>

<style></style>
