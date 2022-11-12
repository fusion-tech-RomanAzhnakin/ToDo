<script>
import HeaderItem from "./components/HeaderItem.vue";
import TodoItem from "./components/TodoItem.vue";
import { filters } from "./functions/filters.js";

export default {
  components: { HeaderItem, TodoItem },
  data() {
    return {
      todos: [],
      visibility: "all",
    };
  },

  computed: {
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },
    remaining() {
      return filters.active(this.todos).length;
    },
  },

  methods: {
    toggleAll(e) {
      this.todos = this.todos.map((todo) => {
        todo.completed = e.target.checked;
        return todo;
      });
    },

    addTodo(value) {
      if (!value) {
        return;
      }
      this.todos.push({
        id: Date.now(),
        title: value,
        completed: false,
      });
    },

    removeCompleted() {
      this.todos = filters.active(this.todos);
    },

    setAll() {
      this.visibility = "all";
    },

    setActive() {
      this.visibility = "active";
    },

    setCompleted() {
      this.visibility = "completed";
    },
  },
};
</script>

<template>
  <section class="todoapp">
    <HeaderItem textHeader="todos" @addTodo="addTodo($event)" />
    <section class="main" v-show="todos.length">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        :checked="remaining === 0"
        @change="toggleAll"
      />
      <label for="toggle-all">Mark all as complete</label>
      <TodoItem :todos-parent="filteredTodos" />
    </section>
    <footer class="footer" v-if="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        <span>{{ remaining === 1 ? "item" : "items" }} left</span>
      </span>
      <ul class="filters">
        <li>
          <button @click="setAll">All</button>
        </li>
        <li>
          <button @click="setActive">Active</button>
        </li>
        <li>
          <button @click="setCompleted">Completed</button>
        </li>
      </ul>
      <button
        class="clear-completed"
        @click="removeCompleted"
        v-if="todos.length > remaining"
      >
        Clear completed
      </button>
    </footer>
  </section>
</template>

<style></style>
