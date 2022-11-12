<script>
export default {
  props: {
    todosParent: Array,
  },
  data() {
    return {
      todos: this.todosParent,
      editedTodo: null,
    };
  },

  methods: {
    removeTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },

    editTodo(todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },

    doneEdit(todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.removeTodo(todo);
      }
    },

    cancelEdit(todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    },
  },
};
</script>

<template>
  <ul class="todo-list">
    <li
      v-for="todo in todosParent"
      class="todo"
      :key="todo.id"
      :class="{ completed: todo.completed, editing: todo === editedTodo }"
    >
      <div class="view">
        <input class="toggle" type="checkbox" v-model="todo.completed" />
        <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
        <button class="destroy" @click="removeTodo(todo)"></button>
      </div>
      <input
        v-if="todo === editedTodo"
        class="edit"
        type="text"
        v-model="todo.title"
        @vnode-mounted="({ el }) => el.focus()"
        @blur="doneEdit(todo)"
        @keyup.enter="doneEdit(todo)"
        @keyup.escape="cancelEdit(todo)"
      />
    </li>
  </ul>
</template>
