<script>
import HeaderItem from "./components/HeaderItem.vue";
import TodoItem from "./components/TodoItem.vue";
import { useTodos } from "@/stores/todos";

export default {
  components: { HeaderItem, TodoItem },
  setup() {
    const store = useTodos();
    return {
      store,
    };
  },
};
</script>

<template>
  <section class="todoapp">
    <HeaderItem textHeader="todos" @addTodo="store.addTodo($event)" />
    <section class="main" v-if="store.todos.length">
      <input
        id="toggle-all"
        class="toggle-all"
        type="checkbox"
        :checked="store.remaining === 0"
        @change="store.toggleAll"
      />
      <label for="toggle-all">Mark all as complete</label>
      <TodoItem />
    </section>
    <footer class="footer" v-if="store.todos.length">
      <span class="todo-count">
        <strong>{{ store.remaining }}</strong>
        <span>{{ store.remaining === 1 ? "item" : "items" }} left</span>
      </span>
      <ul class="filters">
        <li>
          <button @click="store.setAll">All</button>
        </li>
        <li>
          <button @click="store.setActive">Active</button>
        </li>
        <li>
          <button @click="store.setCompleted">Completed</button>
        </li>
      </ul>
      <button
        class="clear-completed"
        @click="store.removeCompleted"
        v-if="store.todos.length > store.remaining"
      >
        Clear completed
      </button>
    </footer>
  </section>
</template>

<style></style>
