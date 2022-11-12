<script>
import { useTodos } from "@/stores/todos";

export default {
  setup() {
    const store = useTodos();
    return {
      store,
    };
  },
};
</script>

<template>
  <ul class="todo-list">
    <li
      v-for="todo in store.filteredTodos"
      class="todo"
      :key="todo.id"
      :class="{ completed: todo.completed, editing: todo === store.editedTodo }"
    >
      <div class="view">
        <input class="toggle" type="checkbox" v-model="todo.completed" />
        <label @dblclick="store.editTodo(todo)">{{ todo.title }}</label>
        <button class="destroy" @click="store.removeTodo(todo)"></button>
      </div>
      <input
        v-if="todo === store.editedTodo"
        class="edit"
        type="text"
        v-model="todo.title"
        @vnode-mounted="({ el }) => el.focus()"
        @blur="store.doneEdit(todo)"
        @keyup.enter="store.doneEdit(todo)"
        @keyup.escape="store.cancelEdit(todo)"
      />
    </li>
  </ul>
</template>
