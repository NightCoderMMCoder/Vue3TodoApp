import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import AddTodo from "../views/Todos/AddTodo";
import EditTodo from "../views/Todos/EditTodo";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/todo/add",
    name: "AddTodo",
    component: AddTodo,
  },
  {
    path: "/todo/edit/:id",
    name: "EditTodo",
    component: EditTodo,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
