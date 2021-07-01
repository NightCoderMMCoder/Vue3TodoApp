<template>
  <div class="search mb-4">
    <input type="text" class="form-control" placeholder="Search..." />
    <div class="dropdown">
      <button
        class="btn btn-primary dropdown-toggle"
        type="button"
        id="sort"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="fas fa-sort"></i> Sort
      </button>
      <ul class="dropdown-menu" aria-labelledby="sort">
        <li @click="$emit('setSortType')">
          <a class="dropdown-item" href="#">
            <i class="fas fa-globe"></i> All
          </a>
        </li>
        <li @click="$emit('setSortType', 'alphabetically')">
          <a class="dropdown-item" href="#">
            <i class="fas fa-sort-alpha-down"></i> Alphabetically
          </a>
        </li>
        <li @click="$emit('setSortType', 'importance')">
          <a class="dropdown-item" href="#">
            <i class="fas fa-star"></i> Importance
          </a>
        </li>
        <li @click="$emit('setSortType', 'dueDate')">
          <a class="dropdown-item" href="#">
            <i class="fas fa-calendar"></i> Due Date
          </a>
        </li>
        <li @click="$emit('setSortType', 'completed')">
          <a class="dropdown-item" href="#">
            <i class="fas fa-check"></i> Completed
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["setSortType"],
};
</script>

<style scoped>
.dropdown-toggle::after {
  display: none;
}
.search {
  display: flex;
}
.search input {
  margin-right: 10px;
}
.fas:not(button .fas),
.far {
  color: var(--primary);
  margin-right: 10px;
}
</style>
