import { defineStore } from "pinia";
import { filters } from "../functions/filters.js";

export const useTodos = defineStore("todos", {
  state: () => {
    return {
      todos: [],
      visibility: "all",
      editedTodo: null,
    };
  },

  getters: {
    filteredTodos() {
      return filters[this.visibility](this.todos);
    },

    remaining() {
      return filters.active(this.todos).length;
    },
  },

  actions: {
    toggleAll(e) {
      this.todos = this.todos.map((todo) => {
        todo.completed = e.target.checked;
        return todo;
      });
    },

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
});
