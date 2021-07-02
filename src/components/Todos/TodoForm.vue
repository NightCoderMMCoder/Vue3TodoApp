<template>
  <div class="card">
    <div class="card-header bg-primary">{{ title }} Todo</div>
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
          <ClipLoader :loading="loading" color="#fff" size="20px" /> {{ title }}
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
import useValidation from "../../hooks/validation";

export default {
  components: { ClipLoader },
  props: {
    title: {
      type: String,
      default: "Add",
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const todo = reactive({
      task: "",
      dueDate: null,
    });

    const { validation, clearValidation, errors } = useValidation(todo);
    const loading = ref(false);

    const collectionRef = db.collection("todos");

    const handleSubmit = async () => {
      const isValidate = validation({ dueDate: false });
      if (isValidate) {
        loading.value = true;
        if (route.name === "EditTodo") {
          await collectionRef.doc(route.params.id).update(todo);
        } else {
          await collectionRef.add({
            ...todo,
            createdAt: new Date().toString(),
          });
        }
        router.push({ name: "Home" });
        loading.value = false;
      }
    };

    onMounted(async () => {
      if (route.name === "EditTodo") {
        loading.value = true;
        const { id } = route.params;
        const doc = await collectionRef.doc(id).get();
        if (doc.exists) {
          todo.task = doc.data().task;
          todo.dueDate = doc.data().dueDate;
          loading.value = false;
        } else {
          router.push({ name: "Home" });
        }
      }
    });

    return { ...toRefs(todo), handleSubmit, errors, clearValidation, loading };
  },
};
</script>

<style></style>
