<template>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" :checked="todo.completed" />
    <label class="form-check-label">
      <p class="mb-0">
        <span :class="{ completed: todo.completed }">{{ todo.task }}</span>
        <br />
        <small :class="{ overDue: isOverDue }" v-if="todo.dueDate">
          <i class="fas fa-calendar"></i> {{ isOverDue ? "OverDue" : "Due" }}
          {{ formatDate }}
        </small>
      </p>
      <span>
        <i class="fas fa-pencil-alt"></i>
        <i class="fas fa-trash" @click="deleteTodo(todo.id)"></i>
        <i class="far fa-star" :class="{ important: todo.important }"></i>
      </span>
    </label>
  </div>
</template>

<script>
import { computed, inject } from "vue";
import db from "../../firebase/init";
import moment from "moment";

export default {
  props: { todo: Object },
  setup(props) {
    const deleteTodo = inject("deleteTodo");
    const formatDate = computed(() => {
      if (props.todo.dueDate) {
        return moment(props.todo.dueDate).format("ddd, MMM DD");
      }
      return;
    });

    const isOverDue = computed(() => {
      if (props.todo.dueDate) {
        const dueDate = moment(props.todo.dueDate);
        const currentDate = moment(new Date());
        return currentDate.diff(dueDate, "days") > 0 ? true : false;
      }
      return;
    });

    return { formatDate, isOverDue, deleteTodo };
  },
};
</script>

<style scoped>
.form-check {
  border-bottom: 1px solid #bbbbbb;
  padding: 20px;
}
.form-check-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.completed {
  transition: 0.3s linear;
  text-decoration: line-through;
  opacity: 0.7;
}
.fa-calendar {
  color: var(--primary);
}
.fa-star {
  color: rgb(160, 160, 160);
  cursor: pointer;
}
.important {
  font-weight: bold;
  color: var(--primary);
}
.overDue {
  color: red;
}
.overDue .fas {
  color: red;
}
.fa-trash {
  margin: 0 20px;
  color: #fa1e0e;
  cursor: pointer;
}
.fa-pencil-alt {
  color: #ffe227;
  cursor: pointer;
}
</style>
