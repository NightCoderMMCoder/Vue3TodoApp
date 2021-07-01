<template>
  <div class="card">
    <div class="card-header bg-primary">Add Todo</div>
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
          <small class="text-danger" v-if="errors.dueDate">
            {{ errors.dueDate }}
          </small>
        </div>
        <button class="btn btn-primary mt-2" :disabled="loading">
          <ClipLoader :loading="loading" color="#fff" size="20px" /> Add
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { reactive, ref, toRefs } from "vue";
import db from "../../firebase/init";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";

export default {
  components: { ClipLoader },
  setup() {
    const router = useRouter();
    const todo = reactive({
      task: "",
      dueDate: null,
    });
    const errors = reactive({});
    const loading = ref(false);

    const handleSubmit = async () => {
      let formValidate = true;
      for (let [key, value] of Object.entries(todo)) {
        if (!value) {
          formValidate = false;
          errors[key] = `Please enter the ${key} field.`;
        }
      }
      if (formValidate) {
        loading.value = true;
        const doc = await db
          .collection("todos")
          .add({ ...todo, createdAt: new Date().toString() });
        router.push({ name: "Home" });
        loading.value = false;
      }
    };

    const clearValidation = (key) => {
      if (todo[key]) {
        errors[key] = "";
      } else {
        errors[key] = `Please enter the ${key} field.`;
      }
    };

    return { ...toRefs(todo), handleSubmit, errors, clearValidation, loading };
  },
};
</script>

<style></style>
